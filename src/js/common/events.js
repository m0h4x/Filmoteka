// Импорт-заглушка для фильмов
import daylyFilms from '../../data/day.json';
// импорт функции для показа галереи
import viewGallery from '../viewGallery';
//импорт функции для сохранения в локальном хранилище
import lStorage from '../storage/localStorage';
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
export const viewWatched = event => {
  const data = lStorage.getWatchedFilms();
  if (data) {
    sStorage.saveFilms(data);
  }
};
//показывает очередь просмотра фильмов
export const viewQueue = event => {
  const data = lStorage.getQueueFilms();
  if (data) {
    sStorage.saveFilms(data);
  }
};
//показывает модалку, не подключена
export const viewModal = event => {
  if (event.target !== event.currentTarget) {
  }
};

//обработчики событий
//срабатывает при первой загрузке
export const firstLoad = event => {
  const data = daylyFilms.results;
  if (data) {
    sStorage.saveFilms(data);
    viewGallery();
  }
};
//срабатывает при нажатии добавить в очередь просмотра
export const toggleWatched = event => {
  const id = event.data.id;
  if (id) {
    event.data.watched == lStorage.checkWatched(id);
    event.currentTarget.value = event.data.watched ? 'REMOVE FROM WATCHED' : 'ADD TO WATCHED';
    if (event.data.watched) {
      lStorage.removeFromWatched(id);
      console.log('removeFromWatched');
    } else {
      const film = sStorage.getFilm(id);
      if (film) {
        lStorage.saveToWatched(film);
        console.log('saveToWatched');
      }
    }
  }
};
//срабатывает при нажатии добавить в просмотренные
export const toggleQueue = event => {
  const id = event.data.id;
  if (id) {
    event.data.queue == lStorage.checkQueue(id);
    event.currentTarget.value = event.data.watched ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE';
    if (event.data.queue) {
      lStorage.removeFromQueue(id);
    } else {
      const film = sStorage.getFilm(id);
      if (film) {
        lStorage.saveToQueue(film);
      }
    }
  }
};
