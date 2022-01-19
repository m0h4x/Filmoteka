import filmCard from './filmCard';

const makeGallery = results => {
  const data = results
    .filter(film => film.title)
    .map(film => {
      const { release_date } = film;
      return filmCard({ ...film, release_date: release_date.split('-')[0] });
    })
    .join('');
  return data;
};
export default makeGallery;
