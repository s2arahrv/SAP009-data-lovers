//import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

//const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");

export function showCharactersByFilm(
  charactersFilmArray,
  index,
  chosenAnimation
) {
  console.log(chosenAnimation);
  // console.log(charactersFilmArray);
  const charactersByFilm = films.filterCharacterByFilm(charactersFilmArray);
  const characterByFilmArray = charactersByFilm[0];

  const filterButton = document.getElementById("filter-button");
  filterButton.addEventListener("click", () => {
    defineAlphabeticalFilter(characterByFilmArray, index, chosenAnimation);
  });
  const animationsTotal = document.getElementById("label-total");
  animationsTotal.innerHTML = `${chosenAnimation.title} has 
  ${characterByFilmArray.length} characters`;
  //
  const charactersAnimationCards = charactersFilmArray
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

}

function defineAlphabeticalFilter(charactersByFilm, index, chosenAnimation) {
  const charactersFilmArrayAlphabeticOrder =
    films.alphabeticOrderCharFilter(charactersByFilm);
  // const chosenAnimation = allAnimations;
  showCharactersByFilm(
    charactersFilmArrayAlphabeticOrder,
    index,
    chosenAnimation
  );
}
