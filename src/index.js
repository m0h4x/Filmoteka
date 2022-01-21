import './sass/main.scss';
import './js/modalFooter';

//элементы страницы
import * as el from './js/common/elements';

//обработчики событий
import * as ev from './js/common/events';

el.logo.addEventListener('click', ev.viewMain);
el.homeBtn.addEventListener('click', ev.viewMain);
el.libraryBtn.addEventListener('click', ev.viewLibrary);
el.searchForm.addEventListener('submit', ev.searchFilms);
document.addEventListener('DOMContentLoaded', ev.firstLoad);
