import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { gallery, baseImgUrl, FILMS_IN_WATCHED, FILMS_IN_QUEUE } from './common/elements';
import {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
} from './storage/storage';
import defaultImage from '../images/no-cover.jpg';

const ADD_TO_WATCHED = 'add to watched';
const RM_FROM_WATCHED = 'remove from watched';

const ADD_TO_QUEUE = 'add to queue';
const RM_FROM_QUEUE = 'remove from queue';

// modal film template
const modalTemplate = document.querySelector('#modalFilmTemplate');
// создаем инстанс лайтбокса
const lightboxInstance = basicLightbox.create(modalTemplate, {
  onShow: instance => {
    const container = instance.element();
    const closeBtn = container.querySelector('.modal__close-btn');
    const btnWatched = container.querySelector('.modal-btn-watched');
    const btnQueue = container.querySelector('.modal-btn-queue');

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

    btnWatched.removeEventListener('click', addToWatchedQueueHandler);
    btnQueue.removeEventListener('click', addToWatchedQueueHandler);
  },
});

let data = [];
let filmIndex;

const addToWatchedQueueHandler = event => {
  event.stopPropagation();
  const elem = event.target;
  const currText = elem.textContent;

  elem.classList.toggle('active');

  switch (currText) {
    case ADD_TO_WATCHED:
      elem.textContent = RM_FROM_WATCHED;
      addToLocalStorage(FILMS_IN_WATCHED, data[filmIndex]);
      break;
    case RM_FROM_WATCHED:
      elem.textContent = ADD_TO_WATCHED;
      removeFromLocalStorage(FILMS_IN_WATCHED, data[filmIndex]);
      break;
    case ADD_TO_QUEUE:
      elem.textContent = RM_FROM_QUEUE;
      addToLocalStorage(FILMS_IN_QUEUE, data[filmIndex]);
      break;
    default:
      elem.textContent = ADD_TO_QUEUE;
      removeFromLocalStorage(FILMS_IN_QUEUE, data[filmIndex]);
      break;
  }
};

const filmModalHandler = filmsArray => {
  // console.log(filmsArray);
  data = filmsArray;

  event.preventDefault();
  event.stopPropagation();
  const card = event.target;
  // console.log(card);

  if (card.classList.contains('film__link')) {
    lightboxInstance.show(instance => {
      const filmId = parseInt(card.closest('.gallery__card').dataset.modalId);
      filmIndex = data.findIndex(e => e.id === filmId);
      // console.log(data[filmIndex]);
      // console.log(filmId);

      const image = data[filmIndex].poster_path
        ? baseImgUrl + data[filmIndex].poster_path
        : defaultImage;

      const elem = instance.element();
      const btnWatched = elem.querySelector('.modal-btn-watched');
      const btnQueue = elem.querySelector('.modal-btn-queue');

      // вставляем значения собранные с обьекта в нужные нам поля
      elem.querySelector('.modal-image img').src = image;
      elem.querySelector('.modal-content h3').textContent = data[filmIndex].title;
      elem.querySelector('[data-attr="orig-title"]').textContent = data[filmIndex].original_title;
      elem.querySelector('[data-attr="avg-rating"]').textContent = data[filmIndex].vote_average;
      elem.querySelector('[data-attr="vote-count"]').textContent = data[filmIndex].vote_count;
      elem.querySelector('[data-attr="genre"]').textContent = data[filmIndex].genres.join(', ');
      elem.querySelector('[data-attr="popularity"]').textContent = data[filmIndex].popularity;
      elem.querySelector('[data-attr="overview"]').textContent = data[filmIndex].overview;
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
