import { ApiService } from './BLL/themoviedb';
import { GenresHelper } from './BLL/genresHelper';
// const api = new ApiService();

export default function renderTopFilms(page = 1, apiReady, apiError) {
  
  ApiService
    .fetchTrendingFilms(page)
    .then(data => {
      const { total_pages, total_results, results } = data;
      ApiService
        .getGenres()
        .then(genres => {
          apiReady(GenresHelper.mixGenres(genres, results), total_results);
        })
        .catch(error => {
          apiError(error);
        });
    })
    .catch(error => {
      apiError(error);
    });
}
