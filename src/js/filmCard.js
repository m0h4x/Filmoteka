import defaultImage from '../images/no-cover.jpg';
const decorGenres = genres => {
  const appendix = '..Other';
  if (!genres.length) {
    return appendix;
  }
  return genres.length < 2
    ? genres.join(', ')
    : genres
        .filter((item, i, arr) => {
          return i < 2;
        })
        .join(', ') + appendix;
};

const filmCard = film => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w342';
  const { id, poster_path, title, genres, release_date } = film;
  const image = poster_path ? baseImgUrl + poster_path : defaultImage;
  const filmGenres = decorGenres(genres);
  return `<li class="film__card" data-modal-id=${id}>
  <a class="film__link" href="#">
    <img class="film__cover" src="${image}" alt="${title}" />
    <h3 class="film__title">${title}</h3>
    <div class="film__info">
      <span class="film__genre">${filmGenres}</span>
      <span class="film__year">&nbsp${release_date}</span>
    </div>
  </a>
</li>`;
};

export default filmCard;
