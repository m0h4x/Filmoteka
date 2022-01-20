export const GenresHelper = class {
    
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
        const textGenres = GenresHelper.getTextGenres(film.genre_ids, genres);
        return {
        ...film,
        genres: textGenres,
        };
    }
    
    //меняет массив films - добавляет к каждому фильму текстовые жанры
    static mixGenres(genres, films) {
        return films.map(film => {
        return GenresHelper.addGenres(film, genres);
        });
    }
}