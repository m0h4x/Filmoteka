//поток приложения, в котором реализована логика его работы
import { flow } from './flow';
//функция для получения популярных фильмов
import renderTopFilms from '../topFilmsComponent';
// Импорт-заглушка для фильмов
import daylyFilms from '../../data/day.json';
//функция для задержки выполнения
import debounce from 'lodash/debounce';

//обработчики событий
export const viewMain = event => {
  event.preventDefault();
  flow({ view: 'main', work: 'idle' });
};
export const viewLibrary = event => {
  event.preventDefault();
  flow({ view: 'library', work: 'idle' });
};
export const viewModal = event => {
  event.preventDefault();
  if (event.target !== event.currentTarget) {
    flow({ view: 'modal', work: 'idle' });
  }
};

const debounced = debounce(() => renderTopFilms(flow), 300);

export const firstLoad = event => {
  flow({ view: 'main', work: 'loading' });
  debounced();
  //flow({ view: 'main', work: 'find' }, renderTopFilms().results);
};
