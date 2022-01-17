class lStorage {
  static save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static remove = key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  static saveFilms = value => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(FILMS, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  static getFilm = id => {
    try {
      const filmId = id;
      const serializedState = localStorage.getItem(FILMS);
      return serializedState === null
        ? undefined
        : JSON.parse(serializedState).filter(film => {
            return film.id == filmId;
          });
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
}

export default lStorage;
