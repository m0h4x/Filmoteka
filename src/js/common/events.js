// Импорт-заглушка для фильмов
import daylyFilms from '../../data/day.json';
// Импорт-заглушка для фильмов
import makeGallery from '../makeGallery';
//элементы страницы
import { backdrop, modalContainer, homeBtns, libraryBtns, gallery } from './elements';

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
let data = [];

//функции меняющие вид страницы
export const viewMain = event => {
  homeBtns.classList.add('active');
  libraryBtns.classList.remove('active');
  gallery.innerHTML = makeGallery(data);
};
export const viewLibrary = event => {
  libraryBtns.classList.add('active');
  homeBtns.classList.remove('active');
  gallery.innerHTML = makeGallery(data);
};
export const viewModal = event => {
  event.preventDefault();
  if (event.target !== event.currentTarget) {
    backdrop.classList.add('active');
    modalContainer.classList.add('active');
  }
};
//обработчики событий
export const firstLoad = event => {
  data = daylyFilms.results;
  gallery.innerHTML = makeGallery(data);
};
