import { ApiService } from '../BLL/themoviedb';

export default function findFilmInfo(id, apiReady, apiError) {
  ApiService.getFilmInfo(id)
    .then(apiReady)
    .catch(error => {
      apiError(error.message);
    });
}
