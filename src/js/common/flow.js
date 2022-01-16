// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';
// Импорт обработчика ответа от сервера
import makeGallery from '../makeGallery';
// Импорт класса для сохранения в сессии
import sStorage from '../sessionStorage';

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
const FILMS = 'Filmoteka_Films';

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
    //makeGallery(films);
  }

  if (state.work == 'loading') {
    //показываем загрузчик
  }

  if (state.work == 'find') {
    //грузим галерею
    //films = fetchImages();
    films = makeGallery(data);
    sStorage.save(FILMS, data);
  }

  if (state.work == 'error') {
    //показываем ошибки
    Notiflix.Report.failure('Title', 'Failure Message');
  }

  gallery.innerHTML = films;
}
