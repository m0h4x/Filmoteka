import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as el from './common/elements';
import * as ev from './modalFilmEvents';

// global values
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w342';
const DESKTOP_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DESKTOP_WIDTH = 1024;

const getImageUrl = () => {
  const width = document.documentElement.clientWidth;
  if (width < DESKTOP_WIDTH) {
    return BASE_IMG_URL;
  }
  return DESKTOP_IMG_URL;
};

const closeOnEscape = (close, event) => {
  const key = event.key;
  if (key == 'Escape') {
    close();
  }
};

const openModalFilm = (data, e) => {
  if (e.target !== e.currentTarget) {
    //находим id ближайшей карточки фильма
    const filmId = parseInt(e.target.closest('.gallery__card').dataset.modalId);
    //находим индекс фильма в массиве фильмов
    const index = data.findIndex(e => e.id === filmId);
    ev.fillModalTemplate(el.modalTemplate, data[index], getImageUrl());
    // создаем инстанс лайтбокса
    const lightboxInstance = basicLightbox.create(el.modalTemplate);
    // открываем лайтбокс и применяем к его содержимому последующую магию ))
    lightboxInstance.show();
    //проверяет есть ли фильм в очереди и меняет название кнопок, добавляет обработчики
    ev.checkFilm(filmId, data[index]);
    //console.log(data[index]);
    //добавляет обработчики закрытия модалки
    const closeBtn = document.querySelector('.modal__close-btn');
    closeBtn.addEventListener('click', lightboxInstance.close);
    el.body.addEventListener('keyup', closeOnEscape.bind(null, lightboxInstance.close));
    //el.body.classList.toggle('disable-scroll');
  }
};

const filmModalHandler = filmsArray => {
  // console.log(filmsArray);
  el.gallery.removeEventListener('click', openModalFilm.bind(null, filmsArray));
  el.gallery.addEventListener('click', openModalFilm.bind(null, filmsArray));
};

export default filmModalHandler;
