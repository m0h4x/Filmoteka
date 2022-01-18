import { ApiService } from './BLL/themoviedb';

const api = new ApiService();

//фильтрует массив полученный от api по id жанров в фильме
function getTextGenres(genre_ids, genres) {
  return genres
    .filter(genre => {
      return genre_ids.some(id => {
        return id == genre.id;
      });
    })
    .map(genre => {
      return genre.name;
    });
}
//распыляет массив жанров и добавляет свойство genres
function addGenres(film, genres) {
  const textGenres = getTextGenres(film.genre_ids, genres);
  return {
    ...film,
    genres: textGenres,
  };
}
//меняет массив films - добавляет к каждому фильму текстовые жанры
function mixGenres(genres, films) {
  return films.map(film => {
    return addGenres(film, genres);
  });
}

export default function renderTopFilms(page = 1, apiReady, apiError) {
  api
    .fetchTrendingFilms(page)
    .then(films => {
      api
        .getGenres()
        .then(genres => {
          apiReady(mixGenres(genres, films));
        })
        .catch(error => {
          apiError(error);
        });
    })
    .catch(error => {
      apiError(error);
    });
}
