import { ApiService } from "./BLL/themoviedb";
import makeGallery from "./makeGallery"


const api = new ApiService();

export function renderTopFilms()
{
     return api.fetchTrendingFilms().then(
        data=>{
            return  makeGallery(data.results);
        }
    ).catch(console.log);
}
export default renderTopFilms;