const closeBtn = document.querySelector('.modal__close-btn');
const backdrop = document.querySelector('.modal__backdrop');
closeBtn.addEventListener('click', () => {
  backdrop.classList.remove('active');
});
// Импорт класса для сохранения в сессии
import sStorage from './sessionStorage';
const FILMS = 'Filmoteka_Films';
console.log(sStorage.getFilm(FILMS, 524434));
