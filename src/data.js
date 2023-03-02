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

  alphabeticOrderCharFilter: function alphabeticOrderCharFilter(dataCharacters) {
    const dataCharactersCopy = [...dataCharacters];
   
    return dataCharactersCopy.sort((a, b) => a.name.localeCompare(b.name));
  },

  filterCharacterByFilm: function filterCharacterByFilm (dataCharacters)
  {
    const dataCharactersCopy = [dataCharacters];
    return dataCharactersCopy;
    
  },

  filterLocationByFilm: function filterLocationByFilm (dataFilms, index)
  {
    const dataFilmsCopy = [...dataFilms];
    return dataFilmsCopy[index].locations;
  },
  filterVehiclesByFilm: function filterVehiclesByFilm (dataFilms, index)
  {
    const dataFilmsCopy = [...dataFilms];
    return dataFilmsCopy[index].vehicles;  
  },

  filterBySearchInput: function filterBySearchInput (films, input)
  {
    const filteredCards = [];
    const searchTerm = input.toUpperCase();
    for (let i = 0; i < films.length; i++) {
      const titles = films[i].title;
 
      if (titles.toUpperCase().includes(searchTerm)) {
      
        filteredCards.push(films[i]);
      }
    }
  
    return filteredCards;
  }

};

