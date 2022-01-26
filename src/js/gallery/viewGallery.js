//элементы страницы
import * as el from '../common/elements';

//меняет разметку галереи и добавляет код открытия модалки
const viewGallery = films => {
  el.gallery.innerHTML = films;
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 250,
      left: 0,
      behavior: 'smooth',
    });
  }
};

export default viewGallery;
