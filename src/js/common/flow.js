// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';
// Импорт обработчика ответа от сервера
import makeGallery from '../makeGallery';

//объект состояния
export let state = {
  //состояние страницы
  work: 'idle', // "idle", "loading", "find", "error"
  //текущий вид страницы
  view: 'main', //"main", "libary"
  //текущий вид библиотеки
  libary: 'watched', //"watched", "queve"
};

//глобальные переменные
export let page = 1;
export let maxPages = 1;
export let error = '';
export let query = '';
export const LIMIT = 20;
export let library = {
  watched: [],
  queve: [],
};
export let films = [];

//элементы страницы
import { backdrop, homeBtns, libraryBtns, gallery } from './elements';

export function flow(parameter, data) {
  //меняет состояние
  state = { ...state, ...parameter };

  if (state.view == 'main') {
    //главная страница
    homeBtns.classList.add('active');
    libraryBtns.classList.remove('active');
  }

  if (state.view == 'library') {
    //библиотека
    libraryBtns.classList.add('active');
    homeBtns.classList.remove('active');
  }

  if (state.view == 'modal') {
    //модалка
    backdrop.classList.add('active');
  }

  if (state.libary == 'watched') {
    //films = library.watched;
    //makeGallery(films);
  }

  if (state.libary == 'queve') {
    //films = library.watched;
    //makeGallery(films);
  }

  if (state.work == 'idle') {
    //начальное состояние, загружаем библиотеку
    //library = loadStorage();
    //films = fetchPopularImages();
    gallery.innerHTML = makeGallery(films);
  }

  if (state.work == 'loading') {
    //показываем загрузчик
    gallery.innerHTML = '<li>Loading...</li>';
  }

  if (state.work == 'find') {
    //грузим галерею
    //films = fetchImages();
    films = data.results;
    gallery.innerHTML = makeGallery(films);
  }

  if (state.work == 'error') {
    //показываем ошибки
    Notiflix.Report.failure('Title', 'Failure Message');
  }
}
