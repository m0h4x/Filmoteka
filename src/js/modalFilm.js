import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { gallery, FILMS_IN_WATCHED, FILMS_IN_QUEUE, body } from './common/elements';
import * as ev from './common/events';
import {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
} from './storage/storage';

import defaultImage from '/images/no-cover.jpg';

// global values
const DESKTOP_WIDTH = 1024;
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w342';
const DESKTOP_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const getImageUrl = () => {
  const width = document.documentElement.clientWidth;
  if (width < DESKTOP_WIDTH) {
    return BASE_IMG_URL;
  }
  return DESKTOP_IMG_URL;
};

const ADD_TO_WATCHED = 'add to watched';
const RM_FROM_WATCHED = 'remove from watched';

const ADD_TO_QUEUE = 'add to queue';
const RM_FROM_QUEUE = 'remove from queue';

let film = {};

// modal film template
const modalTemplate = document.querySelector('#modalFilmTemplate');
// создаем инстанс лайтбокса
const lightboxInstance = basicLightbox.create(modalTemplate, {
  onShow: instance => {
    const container = instance.element();
    const closeBtn = container.querySelector('.modal__close-btn');
    const btnWatched = container.querySelector('.modal-btn-watched');
    const btnQueue = container.querySelector('.modal-btn-queue');
    body.classList.add('disable-scroll');
    btnWatched.addEventListener('click', ev.refreshLibrary.bind(null, instance));
    btnQueue.addEventListener('click', ev.refreshLibrary.bind(null, instance));
    btnWatched.addEventListener('click', addToWatchedQueueHandler);
    btnQueue.addEventListener('click', addToWatchedQueueHandler);

    closeBtn.addEventListener(
      'click',
      e => {
        instance.close();
      },
      { once: true },
    );

    // close on escape key press
    document.onkeydown = e => {
      if (e.key === 'Escape') {
        instance.close();
      }
    };
  },
  onClose: instance => {
    const container = instance.element();
    const btnWatched = container.querySelector('.modal-btn-watched');
    const btnQueue = container.querySelector('.modal-btn-queue');
    body.classList.remove('disable-scroll');
    btnWatched.removeEventListener('click', addToWatchedQueueHandler);
    btnQueue.removeEventListener('click', addToWatchedQueueHandler);
    btnWatched.removeEventListener('click', ev.refreshLibrary);
    btnQueue.removeEventListener('click', ev.refreshLibrary);
  },
});

const addToWatchedQueueHandler = event => {
  event.stopPropagation();

  const elem = event.target;
  const currText = elem.textContent;

  elem.classList.toggle('active');

  switch (currText) {
    case ADD_TO_WATCHED:
      elem.textContent = RM_FROM_WATCHED;
      addToLocalStorage(FILMS_IN_WATCHED, film);
      break;
    case RM_FROM_WATCHED:
      elem.textContent = ADD_TO_WATCHED;
      removeFromLocalStorage(FILMS_IN_WATCHED, film);
      break;
    case ADD_TO_QUEUE:
      elem.textContent = RM_FROM_QUEUE;
      addToLocalStorage(FILMS_IN_QUEUE, film);
      break;
    default:
      elem.textContent = ADD_TO_QUEUE;
      removeFromLocalStorage(FILMS_IN_QUEUE, film);
      break;
  }
};

const filmModalHandler = (getFilm, event) => {
  // console.log(filmsArray);

  event.preventDefault();
  event.stopPropagation();

  const card = event.target;
  // console.log(card);

  if (card.classList.contains('film__link')) {
    lightboxInstance.show(instance => {
      const filmId = parseInt(card.closest('.gallery__card').dataset.modalId);
      const film = getFilm(filmId);

      const image = film.poster_path ? getImageUrl() + film.poster_path : defaultImage;

      const elem = instance.element();
      const btnWatched = elem.querySelector('.modal-btn-watched');
      const btnQueue = elem.querySelector('.modal-btn-queue');

      // вставляем значения собранные с обьекта в нужные нам поля
      elem.querySelector('.modal-image img').src = image;
      elem.querySelector('.modal-content h3').textContent = film.title;
      elem.querySelector('[data-attr="orig-title"]').textContent = film.original_title;
      elem.querySelector('[data-attr="avg-rating"]').textContent = film.vote_average;
      elem.querySelector('[data-attr="vote-count"]').textContent = film.vote_count;
      elem.querySelector('[data-attr="genre"]').textContent = film.genres.join(', ');
      elem.querySelector('[data-attr="popularity"]').textContent = film.popularity;
      elem.querySelector('[data-attr="overview"]').textContent = film.overview;
      btnWatched.textContent = ADD_TO_WATCHED;
      btnQueue.textContent = ADD_TO_QUEUE;

      // reset active states from template
      if (btnWatched.classList.contains('active')) {
        btnWatched.classList.remove('active');
      }

      if (btnQueue.classList.contains('active')) {
        btnQueue.classList.remove('active');
      }

      // check if the film is already in WatchList
      if (checkItemInLocalStorage(FILMS_IN_WATCHED, filmId)) {
        btnWatched.classList.add('active');
        btnWatched.textContent = RM_FROM_WATCHED;
      }

      // check if the film is already in Queue
      if (checkItemInLocalStorage(FILMS_IN_QUEUE, filmId)) {
        btnQueue.classList.add('active');
        btnQueue.textContent = RM_FROM_QUEUE;
      }
    });
  }
};

export default filmModalHandler;
