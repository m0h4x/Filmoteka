// Импорт-заглушка для фильмов
import daylyFilms from '../../data/day.json';
// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальной сессии
import sStorage from '../storage/sessionStorage';
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
  viewGallery();
};
//показывает библиотеку
export const viewLibrary = event => {
  libraryBtns.classList.add('active');
  homeForm.classList.remove('active');
  viewWatched();
  viewGallery();
};
//показывает список просмотренных фильмов
export const viewWatched = event => {};
//показывает очередь просмотра фильмов
export const viewQueue = event => {};

//обработчики событий
//срабатывает при первой загрузке
export const firstLoad = event => {
  const data = daylyFilms.results;
  if (data) {
    sStorage.saveFilms(data);
    viewGallery();
  }
};
