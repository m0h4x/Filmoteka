//обработчики событий
import { toggleWatched, toggleQueue } from './common/events';
//элементы страницы
import { modalBtnWatched, modalBtnQueue, gallery } from './common/elements';
//импорт функции для сохранения в локальной сессии
import sStorage from './storage/sessionStorage';
// импорт функции для рендера разметки
import makeGallery from './makeGallery';

//TODO: add logic for pagination

//меняет разметку галереи и добавляет код открытия модалки
const viewGallery = films => {
  gallery.innerHTML = makeGallery(films);
};

export default viewGallery;
