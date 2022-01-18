const WATCHED_FILMS = 'Filmoteka_Films_Watched';
const QUEUE_FILMS = 'Filmoteka_Films_Queue';
class lStorage {
  static getFilms = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  static getWatchedFilms = () => {
    try {
      const serializedState = localStorage.getItem(WATCHED_FILMS);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  static getQueueFilms = () => {
    try {
      const serializedState = localStorage.getItem(QUEUE_FILMS);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  static saveToWatched = value => {
    const films = getFilms(WATCHED_FILMS);
    try {
      const serializedState = JSON.stringify(films.push(value));
      localStorage.setItem(WATCHED_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static checkWatched = id => {
    const films = getFilms(WATCHED_FILMS).some(film => {
      return film.id != id;
    });
    try {
      const serializedState = JSON.stringify(films);
      localStorage.setItem(WATCHED_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static removeFromWatched = id => {
    const films = getFilms(WATCHED_FILMS).filter(film => {
      return film.id != id;
    });
    try {
      const serializedState = JSON.stringify(films);
      localStorage.setItem(WATCHED_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static saveToQueue = value => {
    const films = getFilms(QUEUE_FILMS);
    try {
      const serializedState = JSON.stringify(films.push(value));
      localStorage.setItem(QUEUE_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static checkQueue = id => {
    const films = getFilms(QUEUE_FILMS).some(film => {
      return film.id != id;
    });
    try {
      const serializedState = JSON.stringify(films);
      localStorage.setItem(QUEUE_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static removeFromQueue = id => {
    const films = getFilms(QUEUE_FILMS).filter(film => {
      return film.id != id;
    });
    try {
      const serializedState = JSON.stringify(films);
      localStorage.setItem(QUEUE_FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
}

export default lStorage;
