import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");

const filterButton = document.getElementById("filter-button");
const filterType = document.getElementById("label-filter-type");

filterButton.addEventListener("click", defineAlphabeticalFilter);

const inputArea = document.getElementById("filter-name-input");
inputArea.addEventListener("keyup", searchFilms);

document.querySelector(".animation-cards").innerHTML =
  showAnimations(allAnimations);

const images = document.querySelectorAll(".posters");

images.forEach((img) => {
  img.addEventListener("click", function () {
    alert("clickopen");
    const index = this.id;
    modal_container.classList.add("show");
    showDescription(index);
  });
});

const btn = document.querySelectorAll(".more");
btn.forEach((bt) => {
  bt.addEventListener("click", function () {
    const index = this.id;
    console.log(index);
    showCharactersByFilm(index);
  });
});

function showCharactersByFilm(index) {
  const charactersByFilm = films.filterCharacterByFilm(allAnimations, index);
  
 
  const animationCardsHTML = charactersByFilm
    .map((element) => {
      return `
        <div class="cards">
        <img  class="posters" src="${element.img}" alt="Pôster de ${element.name}">
          <p id="film-title" class="film-info">${element.name}</p>
          <p class="film-info">${element.gender}</p>
          <button class="more" id="${index}">More</button>
        </div>
      `;
    })
    .join("");

  animationCards.innerHTML = animationCardsHTML;
}

const modal_container = document.getElementById("modal-wrapper");
const close = document.getElementById("close");

close.addEventListener("click", () => {
  alert("click");
  modal_container.classList.remove("show");
});

//ESTAMOS USANDO ESSA FUNCAO
function showDescription(index) {
  const teste = allAnimations[index];
  data.films[0];
  const t = document.getElementById("modal-container");
  t.innerHTML = `
  <div class="modal-container">
  <img id="${index}" class="posters" src="${teste.poster}" alt="Pôster de ${teste.title}">
  <p id="film-title" class="film-info">${teste.description} </p>
  <p class="film-info"> ${teste.producer}</p>
  <button class="buttons" id="close">Close Me</button>
  </div>

  `;
  modal_container.classList.add("show");

  const closeButton = document.querySelector(".modal-container #close");
  closeButton.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });
}

function showAnimations(allAnimations) {
  return allAnimations
    .map(
      (animation, index) =>
        `
      <div class="cards">
      <img id="${index}" class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
      <p id="film-title" class="film-info">${animation.title} </p>
      <p class="film-info"> ${animation.release_date}</p>
      <button class="more" id="${index}">More</button>
      </div>
      `
    )
    .join("");
}

const more = document.getElementById("more");
more.addEventListener("click", () => {
  films.charactersFilteredByFilm(allAnimations[0].people);
});

//essa função pode ser mudada para receber diferentes filtros e passar pra
//proxima funcao de exibição

function defineAlphabeticalFilter(event) {
  event.preventDefault();
  let alphabeticalFilter = null;
  if (filterButton.value === "Show films from A - Z") {
    alphabeticalFilter = films.alphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from Z - A";

    filterType.innerHTML = "A - Z";
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
        <p id="film-title" class="film-info">${animation.title} </p>
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

function searchFilms() {
  const input = document
    .getElementById("filter-name-input")
    .value.toUpperCase();
  //Chamar cards do HTML
  const cards = document.getElementsByClassName("cards");

  //Iterar por todos os cards e selecionar os títulos pelo index de cada um
  for (let i = 0; i < cards.length; i++) {
    const titles = cards[i].querySelector("#film-title");

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
}
