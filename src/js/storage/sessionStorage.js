const FILMS = 'Filmoteka_Films';

class SessionStorage {
  static save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      sessionStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static remove = key => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static load = key => {
    try {
      const serializedState = sessionStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  static saveFilms = value => {
    save(FILMS, value);
  };
  static loadFilms = () => {
    return load(FILMS);
  };
  static getFilm = id => {
    const films = loadFilms();
    return films.filter(film => {
      return film.id == id;
    });
  };
}

export default SessionStorage;
