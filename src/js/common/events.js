//поток приложения, в котором реализована логика его работы
import { flow } from './flow';
//функция для получения популярных фильмов
import renderTopFilms from '../topFilmsComponent';
// Импорт-заглушка для фильмов
import daylyFilms from '../../data/day.json';

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

export const firstLoad = event => {
  flow({ view: 'main', work: 'loading' });
  console.log(renderTopFilms());
  //flow({ view: 'main', work: 'find' }, renderTopFilms().results);
};
