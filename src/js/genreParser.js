import data from '../data/movie-genre-list.json';

// console.log(data.genres);

const genreParseHandler = (arr, limit = null) => {
  let genreList = [];
  let slicedList;

  data.genres.filter(item => {
    if (arr.includes(item.id)) {
      genreList.push(item.name);
    }
  });

  if (limit) {
    slicedList = genreList.slice(0, limit);
  }

  return slicedList ? slicedList.join(', ') : genreList.join(', ');
};

export default genreParseHandler;