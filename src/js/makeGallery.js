import filmCard from './filmCard';

const makeGallery = results => {
  const data = results
    .filter(film => {
      return film.title;
    })
    .map(film => {
      const { id, poster_path, title, genre_ids, release_date } = film;
      return filmCard({ id, poster_path, title, genre_ids, release_date });
    })
    .join('');
  return data;
};
export default makeGallery;
