import { API } from './const';
import axios from 'axios';

export const ApiService = class {
  static async fetchTrendingFilms(page = 1) {
    const response = await axios.get(
      `${API.BASIC_URL}/3/trending/movie/day?api_key=${API.KEY}&page=${page}`,
    );
    return response.data;
  }
  static async getGenres() {
    const response = await axios.get(`${API.BASIC_URL}/3/genre/movie/list?api_key=${API.KEY}`);
    return response.data.genres;
  }
  static async getFilmInfo(id) {
    const response = await axios.get(
      `${API.BASIC_URL}/3/movie/${id}?api_key=${API.KEY}&append_to_response=videos`,
    );
    return response.data.genres;
  }
  static async fetchMoviesResultsByName(page = 1, searchQuery = '') {
    const response = await axios.get(
      `${API.BASIC_URL}/3/search/movie?api_key=${API.KEY}&language=en-US&query=${searchQuery}&page=${page}`,
    );
    return response.data;
  }
};
