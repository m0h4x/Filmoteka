import { API } from "./const";
import axios from "axios";


export const ApiService = class {
    constructor() {
    }

    async fetchTrendingFilms() {
        const response = await axios.get(`${API.BASIC_URL}/3/trending/movie/day?api_key=${API.KEY}&page=1`);
        return response.data;
    }

}