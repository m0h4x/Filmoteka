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
    if (!ApiService.filmGenres) {
      const response = await axios.get(`${API.BASIC_URL}/3/genre/movie/list?api_key=${API.KEY}`);
      ApiService.filmGenres = response.data.genres;
    }
    return ApiService.filmGenres;
  }
  static async getFilmInfo(id) {
    const response = await axios.get(
      `${API.BASIC_URL}/3/movie/${id}?api_key=${API.KEY}&append_to_response=videos`,
    );
    return response.data;
  }
  static async fetchMoviesResultsByName(page = 1, searchQuery = '') {
    const response = await axios.get(
      `${API.BASIC_URL}/3/search/movie?api_key=${API.KEY}&language=en-US&query=${searchQuery}&page=${page}`,
    );
    return response.data;
  }
  static filmGenres;
};
