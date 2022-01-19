// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальной сессии
import SessionStorage from '../storage/sessionStorage';
// Импорт библиотеки пагинации
import pagination from '../pagination';
// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../topFilmsComponent';

//элементы страницы
import * as el from './elements';

//глобальные переменные
let page = 1;
let results = 1;
let films = [];

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
//срабатывает при ошибке запроса
function renderError(error) {
  console.error(error.message);
}
//срабатывает при успешном завершении запроса
function renderReady(topFilms, total_results) {
  results = total_results;
  films = topFilms;
  if (films) {
    pagination.setTotalItems(results);
    viewGallery(films);
  }
}
//срабатывает при смене страницы
export const changePage = eventData => {
  renderTopFilms(eventData.page, renderReady, renderError);
};

//срабатывает при первой загрузке
export const firstLoad = event => {
  pagination.on('beforeMove', changePage);
  renderTopFilms(page, renderReady, renderError);
};
