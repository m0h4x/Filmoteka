import { ApiService } from './BLL/themoviedb';
import { genresHelper } from './BLL/genresHelper';
const api = new ApiService();

export default function renderFoundByNameFilms(page = 1, name, apiReady, apiError) {
  
  api
    .fetchMoviesResultsByName(page, name)
    .then(data => {
      const { total_pages, total_results, results } = data;
      api
        .getGenres()
        .then(genres => {
          apiReady(genresHelper.mixGenres(genres, results), total_results);
        })
        .catch(error => {
          apiError(error);
        });
    })
    .catch(error => {
      apiError(error);
    });
}
