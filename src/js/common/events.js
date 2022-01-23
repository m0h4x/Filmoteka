// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальной сессии
import SessionStorage from '../storage/sessionStorage';
// Импорт лоадера
import { viewLoader, hideLoader } from '../loader';
// Импорт пагинации
import pagination from '../pagination';
// Импорт библиотеки уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../topFilmsComponent';
import renderFoundByNameFilms from '../searchedByNameComponent';

//элементы страницы
import * as el from './elements';

//глобальные переменные
let page = 1;
let results = 1;
let isTopQuery = true;
let films = [];
let searchText = '';

//функции меняющие вид страницы
//показывает главную
export const viewMain = event => {
  event.preventDefault();
  el.homeLink.classList.add('header__link_active');
  el.libraryLink.classList.remove('header__link_active');
  el.header.classList.remove('header__background-library');
  el.searchForm.classList.remove('hidden');
  el.libraryBtns.classList.add('hidden');
  viewGallery(films);
};
//показывает библиотеку
export const viewLibrary = event => {
  event.preventDefault();
  el.homeLink.classList.remove('header__link_active');
  el.libraryLink.classList.add('header__link_active');
  el.libraryBtns.classList.remove('hidden');
  el.searchForm.classList.add('hidden');
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
  if (searchText !== event.currentTarget.query.value.trim()) {
    page = 1;
  }
  searchText = event.currentTarget.query.value.trim();
  if (searchText.length < 3) {
    renderError('Film name lenght contains less 3 symbols');
    return;
  }
  changePage();
};
//срабатывает при ошибке запроса
function renderError(error) {
  searchText = '';
  page = 1;
  films = [];
  viewGallery(films);
  pagination.reset(0);

  el.searchFormError.classList.remove('is-hidden');
  Notify.failure(error, () => {
    el.searchFormError.classList.add('is-hidden');
    hideLoader();
  });
}
//срабатывает при успешном завершении запроса
function renderReady(inputFilms, total_results) {
  results = total_results;
  if (page == 1) {
    pagination.reset(results);
  }
  films = inputFilms;
  if (films) {
    viewGallery(films);
  }
  hideLoader();
}
//срабатывает при смене страницы
export const changePage = eventData => {
  if (eventData) {
    page = eventData.page;
  } else {
    pagination.movePageTo(page);
    return;
  }
  viewLoader();
  if (isTopQuery) {
    renderTopFilms(page, renderReady, renderError);
  } else {
    renderFoundByNameFilms(page, searchText, renderReady, renderError);
  }
};

//срабатывает при первой загрузке
export const firstLoad = event => {
  pagination.on('beforeMove', changePage);
  changePage();
};
