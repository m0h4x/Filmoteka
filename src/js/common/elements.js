//элементы страницы
export const body = document.querySelector('.body');
export const gallery = document.querySelector('.gallery__films');
//header elements
export const header = document.getElementById('header');

export const logo = document.querySelector('.header__logo');
export const homeBtn = document.querySelector('.home');
export const libraryBtn = document.querySelector('.library');

export const searchForm = document.querySelector('.header__search-form');
export const searchBtn = document.querySelector('.header__form-btn');
export const searchInput = document.getElementById('search-form-input');
export const libraryBtns = document.querySelector('.header__buttons');

export const btnWatched = document.getElementById('btn-watched');
export const btnQueue = document.getElementById('btn-queue');

export const homeLink = document.querySelector('.header__nav-home-link');
export const libraryLink = document.querySelector('.header__nav-library-link');

export const searchFormError = document.querySelector('.header__search-error');
//pagination elements
export const pagination = document.getElementById('pagination');
//modal elements
export const backdrop = document.querySelector('.modal__backdrop');
export const modalTemplate = document.querySelector('#modalFilmTemplate');
export const modalFilm = document.querySelector('.modal__container');
export const openCommandModalBtn = document.querySelector('[command-modal-open]');
export const closeCommandModalBtn = document.querySelector('.team__container__icon-box');
export const modalCommand = document.querySelector('.team__container');
// storage keys
export const FILMS_IN_WATCHED = 'MY_WATCHED_LIST';
export const FILMS_IN_QUEUE = 'MY_QUEUE_LIST';
//image url
export const baseImgUrl = 'https://image.tmdb.org/t/p/w342';
