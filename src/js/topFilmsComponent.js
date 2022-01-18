import { ApiService } from "./BLL/themoviedb";
import makeGallery from "./makeGallery"


const api = new ApiService();

export function renderTopFilms()
{
    let temp;
    api.fetchTrendingFilms().then(
        data=>{
            temp = makeGallery(data);
        }
    ).catch(console.log);
    return temp;
}
export default topFilms;