// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальной сессии
import SessionStorage from '../storage/sessionStorage';
// Импорт библиотеки пагинации
import pagination from '../pagination';
// Импорт библиотеки уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../topFilmsComponent';
import renderFoundByNameFilms from '../searchedByNameComponent';

//элементы страницы
import * as el from './elements';

//глобальные переменные
const page = 1;
let results = 1;
let isTopQuery = true;
let films = [];
let searchText = '';

//функции меняющие вид страницы
//показывает главную
export const viewMain = event => {
  event.preventDefault();
  el.homeLink.classList.add('active');
  el.libraryLink.classList.remove('active');
  el.header.classList.remove('header__background-library');
  el.homeForm.classList.remove('disabled');
  el.libraryBtns.classList.add('disabled');
  viewGallery(films);
};
//показывает библиотеку
export const viewLibrary = event => {
  event.preventDefault();
  el.homeLink.classList.remove('active');
  el.libraryLink.classList.add('active');
  el.libraryBtns.classList.remove('disabled');
  el.homeForm.classList.add('disabled');
  el.header.classList.add('header__background-library');
  viewWatched();
  viewGallery(films);
};

//показывает список просмотренных фильмов
export const viewWatched = event => {};
//показывает очередь просмотра фильмов
export const viewQueue = event => {};

//обработчики событий
//срабатывает при нажатии на поиск
export const searchFilms = event => {
  event.preventDefault();
  isTopQuery = false;
  viewGallery([]);
  searchText = event.currentTarget.query.value.trim();
  if (searchText.length < 3) {
    renderError('Film name lenght contains less 4 symbols');
    return;
  }
  //TODO: freeze document / prevent any input
  renderFoundByNameFilms(page, searchText, renderReady, renderError);
};
//срабатывает при ошибке запроса
function renderError(error) {
  searchText = '';
  el.searchFormError.classList.remove('is-hidden');
  Notify.failure(error, () => {
    el.searchFormError.classList.add('is-hidden');
  });
}
//срабатывает при успешном завершении запроса
function renderReady(inputFilms, total_results) {
  results = total_results;
  films = inputFilms;
  if (films) {
    pagination.setTotalItems(results);
    viewGallery(films);
  }
}
//срабатывает при смене страницы
export const changePage = eventData => {
  if (isTopQuery) {
    renderTopFilms(eventData.page, renderReady, renderError);
  } else {
    renderFoundByNameFilms(eventData.page, searchText, renderReady, renderError);
  }
};

//срабатывает при первой загрузке
export const firstLoad = event => {
  pagination.on('beforeMove', changePage);
  renderTopFilms(page, renderReady, renderError);
};
