// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальной сессии
import sStorage from '../storage/sessionStorage';
// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../topFilmsComponent';
//элементы страницы
import { backdrop, modalContainer, homeForm, libraryBtns, gallery } from './elements';

//глобальные переменные
let page = 1;
let maxPages = 1;
let error = '';
let query = '';
const LIMIT = 20;
let library = {
  watched: [],
  queve: [],
};
let films = [];

//функции меняющие вид страницы
//показывает главную
export const viewMain = event => {
  homeForm.classList.add('active');
  libraryBtns.classList.remove('active');
  viewGallery(films);
};
//показывает библиотеку
export const viewLibrary = event => {
  libraryBtns.classList.add('active');
  homeForm.classList.remove('active');
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
  console.log(error.message);
}
//срабатывает при успешном завершении запроса
function renderReady(topFilms, total_results) {
  maxPages = total_results;
  films = topFilms;
  if (films) {
    viewGallery(films);
  }
}
//срабатывает при смене страницы
export const changePage = eventData => {
  renderTopFilms(eventData.page, renderReady, renderError);
};

//срабатывает при первой загрузке
export const firstLoad = event => {
  renderTopFilms(1, renderReady, renderError);
};
