//элементы страницы
import * as el from './common/elements';
//функция показа модалки

const closeOnEscape = event => {
  const key = event.key;
  if (key == 'Escape') {
    closeModal();
  }
  if (event.currentTarget == event.target) {
    closeModal();
  }
};

const closeModal = event => {
  el.closeCommandModalBtn.removeEventListener('click', closeModal);
  el.backdrop.removeEventListener('click', closeOnEscape);
  el.body.removeEventListener('keyup', closeOnEscape);
  el.modalCommand.classList.add('is-hidden');
  el.backdrop.classList.add('is-hidden');
  el.body.classList.remove('disable-scroll');
};

const openModal = event => {
  el.modalCommand.classList.remove('is-hidden');
  el.backdrop.classList.remove('is-hidden');
  el.body.classList.add('disable-scroll');
  el.closeCommandModalBtn.addEventListener('click', closeModal);
  el.backdrop.addEventListener('click', closeOnEscape);
  el.body.addEventListener('keyup', closeOnEscape);
};

export default event => {
  event.preventDefault();
  openModal();
};
