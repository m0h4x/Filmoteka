import './sass/main.scss';
import './js/modal-film';
// Импорт HTTP клиента
import axios from 'axios';
// Импорт библиотеки пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// Импорт библиотеки спиннера
import spin from 'spin';
// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';

//состояние страницы
let state = 'idle'; // "idle", "loading", "find", "error"
//текущий вид страницы
let view = 'main'; //"main", "libary"

let page = 1;
let maxPages = 1;
let error = '';
let query = '';
const LIMIT = 20;

if (state == 'idle') {
  //начальное состояние
}

if (state == 'loading') {
  //показываем загрузчик
}

if (state == 'find') {
  //грузим галерею
}

if (state == 'error') {
  //показываеем ошибки
}
