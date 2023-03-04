import { films } from "./data.js";

import data from "./data/ghibli/ghibli.js";
const animationCards = document.querySelector(".animation-cards");
const filterTypeLabel = document.getElementById("label-filter-type");
const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", () => {
  defineAlphabeticalFilter();
});
let charactersByFilm;
let chosenAnimation;

export function showCharactersByFilm(
  charactersFilmArray,
  filmWithTheCharacter
) {
  charactersByFilm = films.filterCharacterByFilm(charactersFilmArray);
  chosenAnimation = filmWithTheCharacter;
  const charactersTotal = document.getElementById("label-total");
  charactersTotal.innerHTML = `This ${chosenAnimation.title} animation has
  ${charactersByFilm.length} characters`;

  const charactersAnimationCards = charactersByFilm

    .map((element) => {
      return `
  
  <div class="char-cards">
        <div class="card-front">
          <img class="posters" src="${element.img}" alt="Pôster de ${element.name}">
            <p id="film-title" class="char-name">${element.name}</p>
        </div> 
        <div class="card-back">
        <img src="./assets/studio-ghibli-logo.png"/>
        <div class="card-back-info">
            <p id="film-title" class="char-name">${element.name}</p>
            <p class="film-info">Gender: ${element.gender}</p>
            <p class="film-info">Age: ${element.age}</p>
            <p class="film-info">Eye Color: ${element.eye_color}</p>
            <p class="film-info">Hair Color: ${element.hair_color}</p>
            <p class="film-info">Specie: ${element.specie}</p>
            </div>
        </div>    
   </div>   
  `;
    })
    .join("");

  animationCards.innerHTML = charactersAnimationCards;

  // const parentDiv = document.querySelector(".bottom-info");
  // const animationsTotal = document.createElement("div");
  // animationsTotal.classList.add("list-container");
  // animationsTotal.innerHTML = `<input type="submit" id="back-button" class="filter-button buttons" value="Back"/>`;

  // parentDiv.appendChild(animationsTotal);
  // const backButton = document.querySelector("#back-button");
  // backButton.addEventListener("click", () => {
  //   history.pushState(null, null, document.referrer);
  //   window.location.reload();
  // });

  return chosenAnimation;
}

function defineAlphabeticalFilter() {
  let charactersFilmArrayAlphabeticOrder = charactersByFilm;
  if (filterButton.value === "Characters from A-Z") {
    charactersFilmArrayAlphabeticOrder =
      films.alphabeticalOrderCharacterFilter(charactersByFilm);
    filterTypeLabel.innerHTML = "Characters from A-Z";
    filterButton.value = "Characters from Z-A";
  } else if (filterTypeLabel.innerHTML === "Characters from A-Z") {
    charactersFilmArrayAlphabeticOrder =
      films.inverseAlphabeticalOrderCharacterFilter(charactersByFilm);
    //console.log(charactersFilmArrayAlphabeticOrder);
    filterTypeLabel.innerHTML = "Characters from Z-A";
    filterButton.value = "Characters from A-Z";
  }
  showCharactersByFilm(charactersFilmArrayAlphabeticOrder, chosenAnimation);
}

// function getAllValuesBy(dataFilms, key) {
//   const values = dataFilms
//     .filter((film) => film[key] !== undefined)
//     .map((film) => film[key]);
//   const arraySemRepetidos = [...new Set(values)];
//   console.log(arraySemRepetidos);
//   return arraySemRepetidos;
// }

export function showAllCharacters() {
  const dataList = data.films;
  let animationData;

  animationData = dataList.flatMap((film) =>
    film.people.map((character) => character)
  );
  console.log(animationData);

  let animationDatass = animationData
    .map(
      (char, index) =>
        `
      <div class="cards">
      <p id="film-title" class="film-info-title">${char.name} </p>
      <img id="${index}" class="posters" src="${char.img}" alt="Pôster de ${char.name}">
      <p id="film-title" class="film-info-title">${char.age} </p>
      
      </div>
      `
    )
    .join("");

  animationCards.innerHTML = animationDatass;
  const charactersTotal = document.getElementById("label-total");
  charactersTotal.innerHTML = ` animation has
  ${charactersByFilm.length} characters`;
}
