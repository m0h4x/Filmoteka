import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { gallery, FILMS_IN_WATCHED, FILMS_IN_QUEUE } from './common/elements';
import {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
} from './storage/storage';

console.log('gallery', gallery);

const filmModalHandler = () => {
  const filmCards = gallery.querySelectorAll('.film__link');
  // console.log(filmCard);

  filmCards.forEach(card => {
    // console.log(card);
    card.addEventListener('click', onFilmCardClick);
  });

  function onFilmCardClick(e) {
    e.preventDefault();

    const card = this;
    const data = {
      poster_path: card.querySelector('.film__cover').getAttribute('src'),
      title: card.querySelector('.film__title').innerHTML,
      origTitle: card.querySelector('.film__title').dataset.origTitle,
      voteAvg: card.querySelector('.film__info').dataset.voteAverage,
      voteCnt: card.querySelector('.film__info').dataset.voteCount,
      genres: card.querySelector('.film__genre').dataset.genres,
      popularity: card.querySelector('.film__info').dataset.popularity,
      overview: card.querySelector('.film__info').dataset.overview,
    };

    const modalTemplate = document.querySelector('#modalFilmTemplate');

    modalTemplate.content.querySelector('.modal-image img').src = data.poster_path;
    modalTemplate.content.querySelector('.modal-content h3').textContent = data.title;
    modalTemplate.content.querySelector('[data-attr="orig-title"]').textContent = data.origTitle;
    modalTemplate.content.querySelector('[data-attr="avg-rating"]').textContent = data.voteAvg;
    modalTemplate.content.querySelector('[data-attr="vote-count"]').textContent = data.voteCnt;
    modalTemplate.content.querySelector('[data-attr="genre"]').textContent = data.genres;
    modalTemplate.content.querySelector('[data-attr="popularity"]').textContent = data.popularity;
    modalTemplate.content.querySelector('[data-attr="overview"]').textContent = data.overview;

    const lightboxInstance = basicLightbox.create(modalTemplate);
    lightboxInstance.show(() => {
      const filmId = parseInt(this.closest('.film__card').dataset.modalId);
      // console.log(filmId);
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

      btnWatched.addEventListener('click', addToWatchedHandler.bind(null, filmId));
      btnQueue.addEventListener('click', addToQueueHandler.bind(null, filmId));
    });

    const closeBtn = document.querySelector('.modal__close-btn');
    closeBtn.addEventListener('click', () => {
      lightboxInstance.close();
    });

    const addToWatchedHandler = id => {
      const elem = event.target;
      const currText = elem.textContent;

      // console.log(id);
      elem.classList.toggle('active');

      if (currText.toLowerCase() === 'add to watched') {
        elem.textContent = 'remove from watched';
        addToLocalStorage(FILMS_IN_WATCHED, id);
      } else {
        elem.textContent = 'add to watched';
        removeFromLocalStorage(FILMS_IN_WATCHED, id);
      }
    };

    const addToQueueHandler = id => {
      const elem = event.target;
      const currText = elem.textContent;

      // console.log(id);
      elem.classList.toggle('active');

      if (currText.toLowerCase() === 'add to queue') {
        elem.textContent = 'remove from queue';
        addToLocalStorage(FILMS_IN_QUEUE, id);
      } else {
        elem.textContent = 'add to queue';
        removeFromLocalStorage(FILMS_IN_QUEUE, id);
      }
    };
  }
};

export default filmModalHandler;
