import { ApiService } from "./BLL/themoviedb";
import makeGallery from "./makeGallery"


const api = new ApiService();

export function renderTopFilms()
{
     return api.fetchTrendingFilms().then(
        data=>{
            return  makeGallery(data);
        }
    ).catch(console.log);
}
export default renderTopFilms;