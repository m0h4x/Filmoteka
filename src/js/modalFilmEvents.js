//импорт элементов
import * as el from './common/elements';
//импорт функций хранилища
import {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
} from './storage/storage';

const addToWatchedHandler = (id, event) => {
  const elem = event.target;
  const currText = elem.textContent;
  elem.classList.toggle('active');

  if (currText.toLowerCase().trim() === 'add to watched') {
    elem.textContent = 'remove from watched';
    addToLocalStorage(el.FILMS_IN_WATCHED, id);
  } else {
    elem.textContent = 'add to watched';
    removeFromLocalStorage(el.FILMS_IN_WATCHED, id);
  }
};

const addToQueueHandler = (id, event) => {
  const elem = event.target;
  const currText = elem.textContent;

  elem.classList.toggle('active');

  if (currText.toLowerCase().trim() === 'add to queue') {
    elem.textContent = 'remove from queue';
    addToLocalStorage(el.FILMS_IN_QUEUE, id);
  } else {
    elem.textContent = 'add to queue';
    removeFromLocalStorage(el.FILMS_IN_QUEUE, id);
  }
};

export const checkFilm = (filmId, film) => {
  const btnWatched = document.querySelector('.modal-btn-watched');
  const btnQueue = document.querySelector('.modal-btn-queue');

  ///check if the film is already in WatchList
  if (checkItemInLocalStorage(el.FILMS_IN_WATCHED, filmId)) {
    btnWatched.classList.add('active');
    btnWatched.textContent = 'remove from watched';
  }

  // check if the film is already in Queue
  if (checkItemInLocalStorage(el.FILMS_IN_QUEUE, filmId)) {
    btnQueue.classList.add('active');
    btnQueue.textContent = 'remove from queue';
  }

  btnWatched.addEventListener('click', addToWatchedHandler.bind(null, film));
  btnQueue.addEventListener('click', addToQueueHandler.bind(null, film));
};

export const fillModalTemplate = (modalTemplate, film, imageUrl) => {
  const tpl = modalTemplate.content;

  // вставляем значения собранные с обьекта в нужные нам поля

  tpl.querySelector('.modal-image img').src = imageUrl + film.poster_path;
  tpl.querySelector('.modal-content h3').textContent = film.title;
  tpl.querySelector('[data-attr="orig-title"]').textContent = film.original_title;
  tpl.querySelector('[data-attr="avg-rating"]').textContent = film.vote_average;
  tpl.querySelector('[data-attr="vote-count"]').textContent = film.vote_count;
  tpl.querySelector('[data-attr="genre"]').textContent = film.genres.join(', ');
  tpl.querySelector('[data-attr="popularity"]').textContent = film.popularity;
  tpl.querySelector('[data-attr="overview"]').textContent = film.overview;
};
