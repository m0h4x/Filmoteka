import filmCard from './filmCard';

//Returns rendered filmCards string
const makeGallery = results => {
  const data = results
    .filter(film => film.title)
    .map(film => {
      const { release_date } = film;
      const date = release_date ? release_date.split('-')[0] : 'no-date';
      return filmCard({ ...film, release_date: date });
    })
    .join('');
  return data;
};
export default makeGallery;
