export const genresHelper = class {
    
    //фильтрует массив полученный от api по id жанров в фильме
    static getTextGenres(genre_ids, genres) {
        return genres
        .filter(genre => {
            return genre_ids.some(id => {
            return id == genre.id;
            });
        })
        .map(genre => {
            return genre.name;
        });
    }

    //распыляет массив жанров и добавляет свойство genres
    static addGenres(film, genres) {
        const textGenres = genresHelper.getTextGenres(film.genre_ids, genres);
        return {
        ...film,
        genres: textGenres,
        };
    }
    
    //меняет массив films - добавляет к каждому фильму текстовые жанры
    static mixGenres(genres, films) {
        return films.map(film => {
        return genresHelper.addGenres(film, genres);
        });
    }
}