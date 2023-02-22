export const films = {
  alphabeticOrderFilter: function alphabeticOrderFilter(dataFilms) {
    const dataFilmsCopy = [...dataFilms];
    return dataFilmsCopy.sort((a, b) => a.title.localeCompare(b.title));
  },

  inverseAlphabeticOrderFilter: function inverseAlphabeticOrderFilter(
    dataFilms
  ) {
    const dataFilmsCopy = [...dataFilms];
    return dataFilmsCopy.sort((a, b) => b.title.localeCompare(a.title));
  },

  filterCharacterByFilm: function filterCharacterByFilm (dataFilms, index)
  {
    const dataFilmsCopy = [...dataFilms];
    // console.log(dataFilmsCopy[index].people);
    //    console.log(dataFilmsCopy[index].people);
    return dataFilmsCopy[index].people;
    
  }
};
