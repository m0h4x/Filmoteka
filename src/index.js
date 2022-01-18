import './sass/main.scss';
//импорт модулей
import { showModal } from './js/modal-film';
import { loadStorage } from './js/loadStorage';
import { fetchImages, fetchPopularImages } from './js/fetchImages';

// Импорт HTTP клиента
import axios from 'axios';
// Импорт библиотеки пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// Импорт библиотеки спиннера
import spin from 'spin/dist/spin.min';

//элементы страницы
import { logo, homeBtn, libraryBtn, btnWatched, btnQueue, gallery } from './js/common/elements';

//обработчики событий
import {
  viewMain,
  viewLibrary,
  viewModal,
  viewWatched,
  viewQueue,
  firstLoad,
} from './js/common/events';

logo.addEventListener('click', viewMain);
homeBtn.addEventListener('click', viewMain);
libraryBtn.addEventListener('click', viewLibrary);
btnWatched.addEventListener('click', viewWatched);
btnQueue.addEventListener('click', viewQueue);
gallery.addEventListener('click', viewModal);
document.addEventListener('DOMContentLoaded', firstLoad);
