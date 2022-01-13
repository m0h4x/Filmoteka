import defaultImage from '../images/no-cover.jpg';
const filmCard = film => {
  const image = film.cover ? film.cover : defaultImage;
  return `<li class="film__card">
      <a class="film__link" href="#">
        <img class="film__cover" src="${image}" alt="${film.cover}" />
        <h3 class="film__title">${film.title}</h3>
        <div class="film__info">
          <span class="film__genre">${film.genre}</span>
          <span class="film__year">&nbsp${film.year}</span>
        </div>
      </a>
    </li>`;
};

export default filmCard;
