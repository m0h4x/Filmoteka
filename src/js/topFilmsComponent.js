import { ApiService } from "./BLL/themoviedb";
import makeGallery from "./makeGallery"


const api = new ApiService();

export function renderTopFilms(page = 1)
{
     return api.fetchTrendingFilms(page).then(
        data=>{
            return makeGallery(data);
        }
    ).catch(console.log);
}
export default renderTopFilms;