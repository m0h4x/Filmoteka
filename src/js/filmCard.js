import defaultImage from '../images/no-cover.jpg';
const filmCard = film => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w342';
  const {
    id,
    poster_path,
    title,
    original_title,
    vote_average,
    vote_count,
    overview,
    popularity,
    genre_ids,
    release_date,
  } = film;
  const image = poster_path ? baseImgUrl + poster_path : defaultImage;
  return `<li class="film__card" data-modal-id=${id}>
  <a class="film__link" href="#">
    <img class="film__cover" src="${image}" alt="${title}" />
    <h3 class="film__title" data-orig-title="${original_title}">${title}</h3>
    <div class="film__info" data-vote-average="${vote_average}" data-vote-count="${vote_count}"
      data-popularity="${popularity}" data-overview="${overview}">
      <span class="film__genre">${genre_ids}</span>
      <span class="film__year">&nbsp${release_date}</span>
    </div>
  </a>
</li>`;
};

export default filmCard;
