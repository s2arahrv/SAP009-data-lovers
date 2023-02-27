
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
        
          <div class="cards">
          <img  class="posters" src="${element.img}" alt="Pôster de ${element.name}">
            <p id="film-title" class="film-info">${element.name}</p>
            <p class="film-info">${element.gender}</p>
          </div>
        `;
    })
    .join("");

  animationCards.innerHTML = charactersAnimationCards;

}
