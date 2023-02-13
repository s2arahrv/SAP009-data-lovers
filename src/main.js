import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");
const filterButton = document.getElementById("filter-button");
const filterType = document.getElementById("label-filter-type");

filterButton.addEventListener("click", defineAlphabeticalFilter);

const inputArea = document.getElementById("filter-name-input");
inputArea.addEventListener("keydown", films.searchFilms);

document.querySelector(".animation-cards").innerHTML =
  showAnimations(allAnimations);

function showAnimations(allAnimations) {
  return allAnimations
    .map(
      (animation) =>
        `<div class="all-cards">
          <div class="cards">
          <img class="posters" src="${animation.poster}" alt="Pôster do filme">
          <p id="film-title" class="film-info">${animation.title} </p>
          <p class="film-info"> ${animation.release_date}</p>
          </div>
          </div>  
  `
    )
    .join("");
}

//essa função pode ser mudada para receber diferentes filtros e passar pra 
//proxima funcao de exibição

function defineAlphabeticalFilter() {
  let alphabeticalFilter = null;
  if (filterButton.value === "Show films from A - Z") {
    alphabeticalFilter = films.alphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from Z - A";
    filterType.innerHTML = "Animations from A - Z";
  } else if (filterButton.value === "Show films from Z - A") {
    alphabeticalFilter = films.inverseAlphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from A - Z";
    filterType.innerHTML = "Animations from Z - A";
  }
  showFilmsAlphabeticalOrder(alphabeticalFilter);
}

function showFilmsAlphabeticalOrder(alphabeticalFilter) {
  animationCards.innerHTML = alphabeticalFilter
    .map(
      (animation) =>
        `
<div class="cards">
<img class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
<p class="film-info">${animation.title} </p>
<p class="film-info"> ${animation.release_date}</p>
</div>
`
    )
    .join("");
}

function createElement(data) {
  const parentDiv = document.querySelector(".bottom-info");
  const childDiv = document.querySelector(".filter-type");
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.innerHTML =
    "Total number of animations produced by Studio Ghibli: " + data.length;
  parentDiv.insertBefore(animationsTotal, childDiv);
}

createElement(allAnimations);
