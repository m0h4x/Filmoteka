import './sass/main.scss';
//импорт модулей
import { showModal } from './js/modal-film';
import { loadStorage } from './js/loadStorage';
import { fetchImages, fetchPopularImages } from './js/fetchImages';
import { makeGallery } from './js/makeGallery';
import filmCard from './js/filmCard';
// Импорт HTTP клиента
import axios from 'axios';
// Импорт библиотеки пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// Импорт библиотеки спиннера
import spin from 'spin/dist/spin.min';
// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';
import daylyFilms from './data/day.json';

//объект состояния
let state = {
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

//элементы страницы
const logo = document.querySelector('.header__logo');
const homeBtn = document.querySelector('.home');
const libraryBtn = document.querySelector('.library');
const backdrop = document.querySelector('.modal__backdrop');
const homeBtns = document.querySelector('.home-btns');
const libraryBtns = document.querySelector('.library-btns');
const gallery = document.querySelector('.gallery');

//обработчики событий
const viewMain = event => {
  event.preventDefault();
  flow({ view: 'main' });
};
const viewLibrary = event => {
  event.preventDefault();
  flow({ view: 'library' });
};

document.addEventListener('DOMContentLoaded', function () {
  const data = daylyFilms.results
    .filter(film => {
      return film.title;
    })
    .map(film => {
      const { id, poster_path, title, genre_ids, release_date } = film;
      return filmCard({ id, poster_path, title, genre_ids, release_date });
    })
    .join('');

  flow({ view: 'main', work: 'idle' }, data);
});

logo.addEventListener('click', viewMain);
homeBtn.addEventListener('click', viewMain);
libraryBtn.addEventListener('click', viewLibrary);

//поток приложения, в котором реализована логика его работы
function flow(parameter, data) {
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

  if (state.libary == 'watched') {
    films = library.watched;
    //makeGallery(films);
  }

  if (state.libary == 'queve') {
    films = library.watched;
    //makeGallery(films);
  }

  if (state.work == 'idle') {
    //начальное состояние, загружаем библиотеку
    //library = loadStorage();
    //films = fetchPopularImages();
    //makeGallery(films);
    gallery.innerHTML = data;
  }

  if (state.work == 'loading') {
    //показываем загрузчик
  }

  if (state.find == 'find') {
    //грузим галерею
    //films = fetchImages();
    //makeGallery(films);
  }

  if (state.error == 'error') {
    //показываем ошибки
    Notiflix.Report.failure('Title', 'Failure Message');
  }
}
