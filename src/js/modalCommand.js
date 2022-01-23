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
  el.modalCommand.classList.toggle('is-hidden');
  el.backdrop.classList.toggle('is-hidden');
  el.body.classList.toggle('disable-scroll');
};

export default event => {
  event.preventDefault();
  closeModal();
  el.backdrop.removeEventListener('click', closeOnEscape);
  el.backdrop.addEventListener('click', closeOnEscape);
  el.body.removeEventListener('keyup', closeOnEscape);
  el.body.addEventListener('keyup', closeOnEscape);
};
