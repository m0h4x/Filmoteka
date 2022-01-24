import './sass/main.scss';
import 'animate.css';

//элементы страницы
import * as el from './js/common/elements';

//обработчики событий
import * as ev from './js/common/events';
import showCommand from './js/modalCommand';

el.logo.addEventListener('click', ev.viewMain);
el.homeBtn.addEventListener('click', ev.viewMain);
el.libraryBtn.addEventListener('click', ev.viewLibrary);
el.searchForm.addEventListener('submit', ev.searchFilms);
el.openCommandModalBtn.addEventListener('click', showCommand);
el.closeCommandModalBtn.addEventListener('click', showCommand);
document.addEventListener('DOMContentLoaded', ev.firstLoad);
