const closeBtn = document.querySelector('.modal__close-btn');
const backdrop = document.querySelector('.modal__backdrop');
const modalContainer = document.querySelector('.modal__container');
closeBtn.addEventListener('click', () => {
  backdrop.classList.remove('active');
  modalContainer.classList.remove('active');
});
// Импорт класса для сохранения в сессии
import sStorage from './sessionStorage';
console.log(sStorage.getFilm(524434));
