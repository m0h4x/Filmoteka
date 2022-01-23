//элементы страницы
import * as el from './common/elements';
// импорт функции для рендера разметки
import makeGallery from './makeGallery';
// импорт функции для показа модалки
import filmModalHandler from './modalFilm';

//меняет разметку галереи и добавляет код открытия модалки
const viewGallery = (films,isLibrary = false) => {
  el.gallery.innerHTML = makeGallery(films, isLibrary);
  filmModalHandler(films);
};

export default viewGallery;
