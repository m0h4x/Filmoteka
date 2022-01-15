import { ApiService } from './BLL/themoviedb';
import makeGallery from './makeGallery';

const api = new ApiService();

export function renderTopFilms(callback) {
  api
    .fetchTrendingFilms()
    .then(data => {
      callback({ view: 'main', work: 'find' }, data);
    })
    .catch(console.log);
}
export default renderTopFilms;
