
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
              <p id="film-title" class="film-info">${element.name}</p>
          </div> 
          <div class="card-back">
              <p id="film-title" class="film-info">${element.name}</p>
              <p class="film-info">${element.gender}</p>
              <p class="film-info">${element.age}</p>
              <p class="film-info">${element.eye_color}</p>
              <p class="film-info">${element.hair_color}</p>
              <p class="film-info">${element.specie}</p>
          </div>    
     </div>   
    `;
    })
    .join("");

  animationCards.innerHTML = charactersAnimationCards;
}
