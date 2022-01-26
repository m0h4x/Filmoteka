//элементы страницы
import * as el from '../common/elements';
//изображение по умолчанию
import defaultImage from '/images/no-cover.jpg';
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

const filmCard = (film, isLibrary) => {
  const { id, poster_path, title, genres, release_date, vote_average } = film;
  const image = poster_path ? el.baseImgUrl + poster_path : defaultImage;
  const filmGenres = decorGenres(genres);
  const rating = isLibrary ? `<span class="film__rating">${vote_average}</span>` : '';
  return `<li class="gallery__card" data-modal-id=${id}>
  <a class="film__link" href="#">
    <img class="film__cover" src="${image}" alt="${title}" />
    <p class="film__title">${title}</p>
    <div class="film__info">
      <span class="film__genre">${filmGenres}</span>
      <span class="film__year">&nbsp${release_date}</span>
      ${rating}
    </div>
  </a>
</li>`;
};

export default filmCard;
