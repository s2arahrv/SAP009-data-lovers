
import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");

export function showCharactersByFilm(index) {
  const charactersByFilm = films.filterCharacterByFilm(allAnimations, index);

  const parentDiv = document.querySelector(".bottom-info");
  const divBackButton = document.createElement("div");
  divBackButton.classList.add("list-container");
  divBackButton.innerHTML = `
    <input type="submit" id="back-button" class="filter-button buttons" value="Back"/>
    `;
  parentDiv.appendChild(divBackButton);

  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    history.pushState(null, null, document.referrer);
    window.location.reload();
  });

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

}
