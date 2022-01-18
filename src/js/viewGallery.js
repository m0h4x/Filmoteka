//обработчики событий
import { toggleWatched, toggleQueue } from './common/events';
//элементы страницы
import { modalBtnWatched, modalBtnQueue, gallery } from './common/elements';
//импорт функции для сохранения в локальной сессии
import sStorage from './storage/sessionStorage';
// импорт функции для рендера разметки
import makeGallery from './makeGallery';
// импорт функции для показа модалки
import filmModalHandler from './modal-film';

//меняет разметку галереи и добавляет код открытия модалки
const viewGallery = () => {
  const data = sStorage.loadFilms();
  if (data) {
    gallery.innerHTML = makeGallery(data);
    filmModalHandler();
    //modalBtnWatched.addEventListener('click', toggleWatched);
    //modalBtnQueue.addEventListener('click', toggleQueue);
  }
};
export default viewGallery;
