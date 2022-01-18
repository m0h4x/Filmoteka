import './sass/main.scss';
//импорт модулей
import { showModal } from './js/modal-film';
import { fetchImages, fetchPopularImages } from './js/fetchImages';

// Импорт HTTP клиента
import axios from 'axios';
// Импорт библиотеки пагинации
import pagination from './js/pagination';
// Импорт библиотеки спиннера
import spin from 'spin/dist/spin.min';

//элементы страницы
import { logo, homeBtn, libraryBtn, gallery } from './js/common/elements';

//обработчики событий
import { viewMain, viewLibrary, changePage, firstLoad } from './js/common/events';

logo.addEventListener('click', viewMain);
homeBtn.addEventListener('click', viewMain);
libraryBtn.addEventListener('click', viewLibrary);
document.addEventListener('DOMContentLoaded', firstLoad);
pagination.on('beforeMove', changePage);
