// импорт функции для показа галереи
import viewGallery from '../gallery/viewGallery';
//импорт функций хранилища
import { getItemsInLocalStorage, removeFromLocalStorage } from '../storage/storage';
// Импорт лоадера
import { viewLoader, hideLoader } from '../loader';
// Импорт пагинации
import pagination from '../pagination';
// Импорт библиотеки уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// импорт функции для запроса на список самых популярных фильмов на сегодня
import renderTopFilms from '../API/topFilmsComponent';
import renderFoundByNameFilms from '../API/searchedByNameComponent';
// импорт функции для рендера разметки
import makeGallery from '../gallery/makeGallery';

//элементы страницы
import * as el from './elements';

//глобальные переменные
let page = 1;
let isTopQuery = true;
let isLibrary = false;
let isWatched = true;
let results = 0;
let dataFilms = [];
let currFilm;
let searchText = '';
const ITEMS_ON_LIBRARY_PAGE = 9;
const ITEMS_ON_MAIN_PAGE = 20;

//функции меняющие вид страницы
//показывает главную
export const viewMain = event => {
  event.preventDefault();
  el.btnQueue.removeEventListener('click', viewQueue);
  el.btnWatched.removeEventListener('click', viewWatched);
  el.homeLink.classList.add('header__link_active');
  el.libraryLink.classList.remove('header__link_active');
  el.header.classList.remove('header__background-library');
  el.searchForm.classList.remove('hidden');
  el.libraryBtns.classList.add('hidden');
  isLibrary = false;
  isTopQuery = true;
  pagination.movePageTo(1);
  changeRender();
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
//обновляет список фильмов в библиотеке.
export const refreshLibrary = (instance, event) => {
  let isCurrentLibraryWatched = false;
  if (isLibrary) {
    //получаем текст кнопки
    const currText = event.target.textContent;
    //проверяем какая кнопка нажата
    switch (currText) {
      case el.RM_FROM_WATCHED:
        removeFromLocalStorage(el.FILMS_IN_WATCHED, currFilm);
        dataFilms = getItemsInLocalStorage(el.FILMS_IN_WATCHED);
        isCurrentLibraryWatched = true;
        break;
      case el.ADD_TO_WATCHED:
        isCurrentLibraryWatched = true;
        break;
      case el.RM_FROM_QUEUE:
        removeFromLocalStorage(el.FILMS_IN_QUEUE, currFilm);
        dataFilms = getItemsInLocalStorage(el.FILMS_IN_QUEUE);
        break;
    }
    //проверяем совпадает ли вид библиотеки с кнопкой
    if (isCurrentLibraryWatched == isWatched) {
      changeRender();
      instance.close();
    }
  }
};

//показывает список просмотренных фильмов .
export const viewWatched = event => {
  isWatched = true;
  dataFilms = getItemsInLocalStorage(el.FILMS_IN_WATCHED);
  pagination.movePageTo(1);
  changeRender();
};
//показывает очередь просмотра фильмов
export const viewQueue = event => {
  isWatched = false;
  dataFilms = getItemsInLocalStorage(el.FILMS_IN_QUEUE);
  pagination.movePageTo(1);
  changeRender();
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
  changeRender();
};
//срабатывает при ошибке запроса
function renderError(error) {
  searchText = '';
  page = 1;

  viewGallery([]);
  pagination.reset(0);

  el.searchFormError.classList.remove('is-hidden');
  Notify.failure(error);
  el.searchFormError.classList.add('is-hidden');
  hideLoader();
}
//обновляет библоиотеку
const renderLibrary = () => {
  const begin = (page - 1) * ITEMS_ON_LIBRARY_PAGE;
  const end = page * ITEMS_ON_LIBRARY_PAGE;
  const pageFilms = dataFilms.slice(begin, end);
  const renderedFilms = makeGallery(pageFilms, true);
  if (page == 1) {
    pagination.setItemsPerPage(ITEMS_ON_LIBRARY_PAGE);
    pagination.reset(dataFilms.length);
  }
  viewGallery(renderedFilms);
};
//срабатывает при успешном завершении запроса
function renderReady(inputFilms, total_results) {
  if (inputFilms) {
    dataFilms = inputFilms;
    results = total_results;
    const renderedFilms = makeGallery(dataFilms);
    if (page == 1) {
      pagination.setItemsPerPage(ITEMS_ON_MAIN_PAGE);
      pagination.reset(results);
      if (!isTopQuery) {
        Notify.success(`Find ${total_results} films`);
      }
    }
    viewGallery(renderedFilms);
  }
  hideLoader();
}

const changeRender = () => {
  if (isLibrary) {
    renderLibrary();
  } else {
    viewLoader();
    if (isTopQuery) {
      el.searchInput.value = '';
      renderTopFilms(page, renderReady, renderError);
    } else {
      renderFoundByNameFilms(page, searchText, renderReady, renderError);
    }
  }
};

//срабатывает при смене страницы
export const changePage = eventData => {
  if (page != eventData.page) {
    page = eventData.page;
    changeRender();
  }
};

//срабатывает при первой загрузке
export const firstLoad = event => {
  pagination.on('beforeMove', changePage);
  changeRender();
};

//срабатывает при открытии модалки
export const getFilm = filmId => {
  const filmIndex = dataFilms.findIndex(e => e.id === filmId);
  currFilm = dataFilms[filmIndex];
  return currFilm;
};
