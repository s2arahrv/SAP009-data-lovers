//import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

//const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");
const filterTypeLabel = document.getElementById("label-filter-type");
const filterButton = document.getElementById("filter-button");
let charactersByFilm;
let chosenAnimation;
filterButton.addEventListener("click", () => {
  defineAlphabeticalFilter();
});

export function showCharactersByFilm(
  charactersFilmArray,
  filmWithTheCharacter
) {
  charactersByFilm = films.filterCharacterByFilm(charactersFilmArray);
  chosenAnimation = filmWithTheCharacter;
  const animationsTotal = document.getElementById("label-total");
  animationsTotal.innerHTML = `This ${chosenAnimation.title} animation has
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
