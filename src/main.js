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
    //alert('clickopen');
    const index = this.id;
    modal_container.classList.add("show");
    showDescription(index);
  });
});

const modal_container = document.getElementById("modal-wrapper");
//const open = document.getElementById("open");

// open.addEventListener("click", () => {
//   alert('clickopen');
//   modal_container.classList.add("show");
// });



//ESTAMOS USANDO ESSA FUNCAO
function showDescription(index) {

  const teste = allAnimations[index];
  
  const t = document.getElementById("modal-container");
  t.innerHTML =  `
  <div class="modal">
  <div class="modal-side">
  <img id="${index}" class="posters" src="${teste.poster}" alt="Pôster de ${teste.title}">
  <p class="modal-title">${teste.title}</p>
  <p class="film-info">Director: ${teste.director}<br>Producer: ${teste.producer}<br>Release: ${teste.release_date}<br>RT Score: ${teste.rt_score}</p>
  </div>
  <div class="modal-side">
  <p class="modal-title">Synopsis</p>
  <p class="film-info">${teste.description}</p>
  <p class="more-info">For more information:</p>
  <button class="buttons more-info-bts">Characters</button>
  <button class="buttons more-info-bts">Locations</button>
  <button class="buttons more-info-bts">Vehicles</button>
  <button class="buttons" id="close">Go back</button>
  </div>
  </div>`

  modal_container.classList.add("show");

  const close = document.getElementById("close");
  close.addEventListener("click", () => {
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
      </div>
      `
    )
    .join("");
}

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

