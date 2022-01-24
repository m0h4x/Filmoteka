import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { gallery, FILMS_IN_WATCHED, FILMS_IN_QUEUE } from './common/elements';
import {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
} from './storage/storage';

// global values
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w342';

const addToWatchedHandler = item => {
  const elem = event.target;
  const currText = elem.textContent;

  elem.classList.toggle('active');

  if (currText.toLowerCase().trim() === 'add to watched') {
    elem.textContent = 'remove from watched';
    addToLocalStorage(FILMS_IN_WATCHED, item);
  } else {
    elem.textContent = 'add to watched';
    removeFromLocalStorage(FILMS_IN_WATCHED, item);
  }
};

const addToQueueHandler = item => {
  const elem = event.target;
  const currText = elem.textContent;

  elem.classList.toggle('active');

  if (currText.toLowerCase().trim() === 'add to queue') {
    elem.textContent = 'remove from queue';
    addToLocalStorage(FILMS_IN_QUEUE, item);
  } else {
    elem.textContent = 'add to queue';
    removeFromLocalStorage(FILMS_IN_QUEUE, item);
  }
};

const onCardClick = (args, event) => {
  event.preventDefault();
  event.stopPropagation();
  const data = args;

  const element = event.target;
  // console.log(element);
  let filmId;

  if (element.classList.contains('film__link')) {
    filmId = parseInt(element.closest('.gallery__card').dataset.modalId);
    const index = data.findIndex(e => e.id === filmId);
    // console.log(data[index]);

    // modal film template
    const modalTemplate = document.querySelector('#modalFilmTemplate');

    const tpl = modalTemplate.content;

    // вставляем значения собранные с обьекта в нужные нам поля
    tpl.querySelector('.modal-image img').src = BASE_IMG_URL + data[index].poster_path;
    tpl.querySelector('.modal-content h3').textContent = data[index].title;
    tpl.querySelector('[data-attr="orig-title"]').textContent = data[index].original_title;
    tpl.querySelector('[data-attr="avg-rating"]').textContent = data[index].vote_average;
    tpl.querySelector('[data-attr="vote-count"]').textContent = data[index].vote_count;
    tpl.querySelector('[data-attr="genre"]').textContent = data[index].genres.join(', ');
    tpl.querySelector('[data-attr="popularity"]').textContent = data[index].popularity;
    tpl.querySelector('[data-attr="overview"]').textContent = data[index].overview;

    // создаем инстанс лайтбокса
    const lightboxInstance = basicLightbox.create(modalTemplate);
    const elem = lightboxInstance.element();
    const btnWatched = elem.querySelector('.modal-btn-watched');
    const btnQueue = elem.querySelector('.modal-btn-queue');

    // check if the film is already in WatchList
    if (checkItemInLocalStorage(FILMS_IN_WATCHED, filmId)) {
      btnWatched.classList.add('active');
      btnWatched.textContent = 'remove from watched';
    }

    // check if the film is already in Queue
    if (checkItemInLocalStorage(FILMS_IN_QUEUE, filmId)) {
      btnQueue.classList.add('active');
      btnQueue.textContent = 'remove from queue';
    }

    btnWatched.addEventListener('click', addToWatchedHandler.bind(null, data[index]));
    btnQueue.addEventListener('click', addToQueueHandler.bind(null, data[index]));

    if (basicLightbox.visible()) {
      return;
    }
    lightboxInstance.show();

    const closeBtn = document.querySelector('.modal__close-btn');
    closeBtn.addEventListener('click', () => {
      lightboxInstance.close();
    });
  }
};

const filmModalHandler = filmsArray => {
  // console.log(filmsArray);

  gallery.addEventListener('click', onCardClick.bind(null, filmsArray));
};

export { onCardClick, filmModalHandler };
