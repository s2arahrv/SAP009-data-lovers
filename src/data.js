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

  alphabeticalOrderCharacterFilter: function alphabeticalOrderCharacterFilter(
    dataCharacters
  ) {    
    const dataCharactersCopy = [...dataCharacters];
    return  dataCharactersCopy.sort((a, b) => a.name.localeCompare(b.name));
  },
  inverseAlphabeticalOrderCharacterFilter: function inverseAlphabeticalOrderCharacterFilter(
    dataCharacters
  ) {    
    const dataCharactersCopy = [...dataCharacters];
    return  dataCharactersCopy.sort((a, b) => b.name.localeCompare(a.name));
  },

  

  filterCharacterByFilm: function filterCharacterByFilm(dataCharacters) {
    const dataCharactersCopy = [...dataCharacters];
    // console.log(typeof [...dataCharacters]);
    return dataCharactersCopy;
  },

  filterLocationByFilm: function filterLocationByFilm(dataVehicles) {
    const dataFilmsCopy = [...dataVehicles];
    return dataFilmsCopy;
  },

  filterVehiclesByFilm: function filterVehiclesByFilm(dataFilms) {
    const dataFilmsCopy = [...dataFilms];
    return dataFilmsCopy;
  },

  filterBySearchInput: function filterBySearchInput(films, input) {
    const filteredCards = [];
    const searchTerm = input.toUpperCase();
    for (let i = 0; i < films.length; i++) {
      const titles = films[i].title;

      if (titles.toUpperCase().includes(searchTerm)) {
        filteredCards.push(films[i]);
      }
    }

    return filteredCards;
  },
};
