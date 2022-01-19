import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { gallery } from './common/elements';

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
    lightboxInstance.show();

    const closeBtn = document.querySelector('.modal__close-btn');
    // const backdrop = document.querySelector('.modal__backdrop');
    closeBtn.addEventListener('click', () => {
      lightboxInstance.close();
    });

    // console.log(card);
  }
};

export default filmModalHandler;
