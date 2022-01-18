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
import renderTopFilms from './topFilmsComponent'

//TODO: add logic for pagination

//меняет разметку галереи и добавляет код открытия модалки
const viewGallery = () => {
  
  const topFilms = renderTopFilms()
  .then(renderReady)
  .catch(renderLocal);
  
};

export default viewGallery;

function renderLocal(){
  const data = sStorage.loadFilms();
  let fullGallery = '';
  if (data) {
    fullGallery += makeGallery(data);
    //modalBtnWatched.addEventListener('click', toggleWatched);
    //modalBtnQueue.addEventListener('click', toggleQueue);
  }
  gallery.innerHTML = fullGallery;
  filmModalHandler();
}
function renderReady(topFilms){
  const data = sStorage.loadFilms();
  let fullGallery = topFilms;
  if (data) {
    fullGallery += makeGallery(data);
    //modalBtnWatched.addEventListener('click', toggleWatched);
    //modalBtnQueue.addEventListener('click', toggleQueue);
  }
  gallery.innerHTML = fullGallery;
  filmModalHandler();
}