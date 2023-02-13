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
  
  searchFilms: function searchFilms() {
    const input = document
      .getElementById("filter-name-input")
      .value.toUpperCase();
    //Chamar cards do HTML
    const cards = document.getElementsByClassName("cards");

    //Iterar por todos os cards e selecionar os títulos pelo index de cada um
    for (let i = 0; i < cards.length; i++) {
      const titles = cards[i].querySelector("#film-title");
      //console.log(titles);

      //Checar o texto do título em uppercase e o index de input no array
      if (titles.innerText.toUpperCase().indexOf(input) > -1) {
        //Retornar o card do array se o index for válido, ou seja, existir no array (igual ou maior que 0)
        cards[i].style.display = "";
      } else {
        //Se o index for inválido, o display será nulo, e nada aparecerá
        cards[i].style.display = "none";
      }

      //console.log(cards);
    }
  },
};
