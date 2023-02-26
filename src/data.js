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
    return dataFilmsCopy[index].people;
    
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

  filterBySearchInput: function filterBySearchInput (cards, input)
  {
    const filteredCards = [];
    const searchTerm = input.toUpperCase();
    for (let i = 0; i < cards.length; i++) {
      const titles = cards[i].querySelector("#film-title");
 
      if (titles.innerText.toUpperCase().includes(searchTerm)) {
      //  alert('filtertitle');
        filteredCards.push(cards[i]);
      }
    }
  
    return filteredCards;
  }

};

