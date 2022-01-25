// импорт функции для показа галереи
import viewGallery from '../gallery/viewGallery';
//импорт функций хранилища
import { getItemsInLocalStorage } from '../storage/storage';
// Импорт лоадера
import { viewLoader, hideLoader } from '../loader';
// Импорт пагинации
import pagination from '../pagination';
// Импорт библиотеки уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../API/topFilmsComponent';
import renderFoundByNameFilms from '../API/searchedByNameComponent';
// импорт функции для показа модалки
import { onCardClick } from '../modalFilm';

//элементы страницы
import * as el from './elements';

//глобальные переменные
let page = 1;
let libraryPage = 1;
let results = 1;
let isTopQuery = true;
let isLibrary = false;
let films = [];
let libraryFilms = [];
let searchText = '';
const ITEMS_ON_PAGE = 20;

//функции меняющие вид страницы
//показывает главную
export const viewMain = event => {
  event.preventDefault();
  el.btnQueue.removeEventListener('click', viewQueue);
  el.btnWatched.removeEventListener('click', viewWatched);
  el.btnWatched.removeEventListener('focus', focusWatched);
  el.btnQueue.removeEventListener('focus', focusQueue);
  el.homeLink.classList.add('header__link_active');
  el.libraryLink.classList.remove('header__link_active');
  el.header.classList.remove('header__background-library');
  el.searchForm.classList.remove('hidden');
  el.libraryBtns.classList.add('hidden');
  el.gallery.innerHTML = '';
  isLibrary = false;
  viewGallery(films);
  pagination.setTotalItems(results);
  pagination.movePageTo(page);
};
//показывает библиотеку
export const viewLibrary = event => {
  event.preventDefault();
  el.homeLink.classList.remove('header__link_active');
  el.libraryLink.classList.add('header__link_active');
  el.libraryBtns.classList.remove('hidden');
  el.searchForm.classList.add('hidden');
  el.header.classList.add('header__background-library');
  el.btnQueue.addEventListener('click', viewQueue);
  el.btnWatched.addEventListener('click', viewWatched);
  el.btnWatched.addEventListener('focus', focusWatched);
  el.btnQueue.addEventListener('focus', focusQueue);
  el.gallery.innerHTML = '';
  el.gallery.removeEventListener('click', onCardClick);
  isLibrary = true;
  viewWatched();
  focusWatched();
};
//меняет вид кнопки Watched
export const focusWatched = () => {
  el.btnWatched.classList.add('in-active');
  el.btnQueue.classList.remove('in-active');
};
//меняет вид кнопки Queue
export const focusQueue = () => {
  el.btnWatched.classList.remove('in-active');
  el.btnQueue.classList.add('in-active');
};
//показывает список просмотренных фильмов .
const viewWatched = event => {
  libraryFilms = getItemsInLocalStorage(el.FILMS_IN_WATCHED);
  pagination.setTotalItems(libraryFilms.length);
  changePage();
};
//показывает очередь просмотра фильмов
const viewQueue = event => {
  libraryFilms = getItemsInLocalStorage(el.FILMS_IN_QUEUE);
  pagination.setTotalItems(libraryFilms.length);
  changePage();
};

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
//обновляет библоиотеку
const renderLibray = () => {
  const begin = (libraryPage - 1) * ITEMS_ON_PAGE;
  const end = libraryPage * ITEMS_ON_PAGE;
  const pageFilms = libraryFilms.slice(begin, end);
  viewGallery(pageFilms);
};
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
  if (isLibrary) {
    if (eventData) {
      libraryPage = eventData.page;
    } else {
      pagination.movePageTo(libraryPage);
      return;
    }
    renderLibray();
    return;
  }
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
