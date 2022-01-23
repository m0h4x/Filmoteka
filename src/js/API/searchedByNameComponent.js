import { ApiService } from '../BLL/themoviedb';
import { GenresHelper } from '../BLL/genresHelper';
// const api = new ApiService();

export default function renderFoundByNameFilms(page = 1, name, apiReady, apiError) {
  ApiService.fetchMoviesResultsByName(page, name)

    .then(data => {
      const { total_pages, total_results, results } = data;
      if (total_results == 0) {
        throw new Error('No results were found for your search');
      }
      ApiService.getGenres()

        .then(genres => {
          apiReady(GenresHelper.mixGenres(genres, results), total_results);
        })
        .catch(error => {
          apiError(error.message);
        });
    })
    .catch(error => {
      apiError(error.message);
    });
}
