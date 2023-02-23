import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

const allAnimations = data.films;

const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", defineAlphabeticalFilter);

const filterTypeLabel = document.getElementById("label-filter-type");

const searchInput = document.getElementById("filter-name-input");
searchInput.addEventListener("keyup", searchFilms);

const animationCards = document.querySelector(".animation-cards");

document.querySelector(".animation-cards").innerHTML =
  showAnimations(allAnimations);

const modal_container = document.getElementById("modal-wrapper");

const posterImage = document.querySelectorAll(".posters");
posterImage.forEach((img) => {
  img.addEventListener("click", function () {
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

function showAnimations(allAnimations) {
  console.log(allAnimations);
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

//ESTAMOS USANDO ESSA FUNCAO PARA O MODAL
function showDescription(index) {
  const chosenAnimation = allAnimations[index];
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <div class="modal">
  <div class="modal-side">
  <img id="${index}" class="posters" src="${chosenAnimation.poster}" alt="Pôster de ${chosenAnimation.title}">
  <p class="modal-title">${chosenAnimation.title}</p>
  <p class="film-info">Director: ${chosenAnimation.director}<br>Producer: ${chosenAnimation.producer}<br>Release: ${chosenAnimation.release_date}<br>RT Score: ${chosenAnimation.rt_score}</p>
  </div>
  <div class="modal-side">
  <p class="modal-title">Synopsis</p>
  <p class="film-info">${chosenAnimation.description}</p>
  <p class="more-info">For more information:</p>
  <button class="buttons more-info-bts" id="characters-button-${index}">Characters</button>
  <button class="buttons more-info-bts" id="location-button-${index}">Locations</button>
  <button class="buttons more-info-bts" id="vehicles-button-${index}">Vehicles</button>
  <button class="buttons" id="close">Go back</button>
  </div>
  </div>`;

  modal_container.classList.add("show");

  const close = document.getElementById("close");
  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });

  const locationButton = document.getElementById("location-button-" + index);
  const characterButton = document.getElementById("characters-button-" + index);
  const vehiclesButton = document.getElementById("vehicles-button-" + index);

  locationButton.addEventListener("click", function () {
    const locationButtonId = this.id;
    const index = locationButtonId.split("-").pop();
    modal_container.classList.remove("show");
    showLocationByFilm(index);
  });

  characterButton.addEventListener("click", function () {
    const characterButtonId = this.id;
    const index = characterButtonId.split("-").pop();
    modal_container.classList.remove("show");
    showCharactersByFilm(index);
  });

  vehiclesButton.addEventListener("click", function () {
    const vehiclesButtonId = this.id;
    const index = vehiclesButtonId.split("-").pop();
    modal_container.classList.remove("show");
    showVehiclesByFilm(index);
  });
}

// MOSTRA TODAS AS ANIMACOES LOGO QUE ABRE 
// STATUS: SEM MODAL
// function showAnimations(allAnimations) {
//   return allAnimations
//     .map(
//       (animation, index) =>
//         `
//       <div class="cards">
//       <img id="${index}" class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
//       <p id="film-title" class="film-info">${animation.title} </p>
//       <p class="film-info"> ${animation.release_date}</p>
//       <button class="more" id="${index}">More</button>
//       </div>
//       `
//     )
//     .join("");
// }

//essa função pode ser mudada para receber diferentes filtros e passar pra
//proxima funcao de exibição

function defineAlphabeticalFilter(event) {
  event.preventDefault();
  let alphabeticalFilter = null;
  if (filterButton.value === "Show films from A - Z") {
    alphabeticalFilter = films.alphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from Z - A";

    filterTypeLabel.innerHTML = "A - Z";
    filterTypeLabel.innerHTML = "Animations from A - Z";
  } else if (filterButton.value === "Show films from Z - A") {
    alphabeticalFilter = films.inverseAlphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from A - Z";
    filterTypeLabel.innerHTML = "Animations from Z - A";
  }
  showFilmsAlphabeticalOrder(alphabeticalFilter);
}

// MOSTRA TODAS AS ANIMACOES LOGO QUE CLICA NO FILTRO A-Z
// STATUS: SEM MODAL
// SUGESTAO - FUNDIR FUNCAO COM SHOWALLANIMATIONS

function showFilmsAlphabeticalOrder(alphabeticalFilter) {
  animationCards.innerHTML = alphabeticalFilter
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
  const closeButton = document.querySelector(".more");
  closeButton.addEventListener("click", () => {
    alert('xuxu');
  });
    
}

// INICIO DA IDEIA DE CALCULO AGREGADO
// STATUS: FUNCIONA
// SUGESTAO PRECISA IR UM PEDAÇO PRA DATA.JS / pode ser chamada por eventlistener (aí tirar linha 151))
function createElement() {
  const parentDiv = document.querySelector(".bottom-info");
  const childDiv = document.querySelector(".filter-type");
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.innerHTML =
    "Total number of animations produced by Studio Ghibli: " +
    allAnimations.length;
  parentDiv.insertBefore(animationsTotal, childDiv);
}

createElement();

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

// NOVA FUNCAO DE FILTRO DE PERSONAGENS POR FILME
// PENSAR ONDE COLOCAR O BACKBUTTON - NO MOMENTO É FILHA DA DIV.BOTTOM-INFO
function showCharactersByFilm(index) {
  const charactersByFilm = films.filterCharacterByFilm(allAnimations, index);

  const parentDiv = document.querySelector(".bottom-info");
  const divBackButton = document.createElement("div");
  divBackButton.classList.add("list-container");
  divBackButton.innerHTML = `<button id="back-button">Go Back</button>`;
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
          <button class="more" id="${index}">More</button>
        </div>
      `;
    })
    .join("");

  animationCards.innerHTML = charactersAnimationCards;
}

function showLocationByFilm(index) {
  const locationsByFilm = films.filterLocationByFilm(allAnimations, index);

  const parentDiv = document.querySelector(".bottom-info");  
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.innerHTML = `<button id="back-button">Go Back</button>`;

  parentDiv.appendChild(animationsTotal);
  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    history.pushState(null, null, document.referrer);
    window.location.reload();
  });

  const animationCardsLocation = locationsByFilm
    .map((element) => { 
      return `
    <div class="cards">
    <img class="posters" src="${element.img}" alt="Pôster de ${element.name}">
    <p id="film-title" class="film-info">${element.name}</p>
    <p class="film-info">Climate: ${element.climate}<br>Terrain: ${element.terrain}<br>Surface water: ${element.surface_water}</p>
    </div>
    `;
    })
    .join("");

  animationCards.innerHTML = animationCardsLocation;
} 


// NOVA FUNCAO DE FILTRO DE VEÍCULOS POR FILME
// PENSAR ONDE COLOCAR O BACKBUTTON - NO MOMENTO É FILHA DA DIV.BOTTOM-INFO
function showVehiclesByFilm(index) {
  const vehiclesByFilm = films.filterVehiclesByFilm(allAnimations, index);

  const parentDiv = document.querySelector(".bottom-info");
  const divBackButton = document.createElement("div");
  divBackButton.classList.add("list-container");
  divBackButton.innerHTML = `<button id="back-button">Go Back</button>`;
  parentDiv.appendChild(divBackButton);

  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    history.pushState(null, null, document.referrer);
    window.location.reload();
  });

  const vehiclesAnimationCards = vehiclesByFilm
    .map((element) => {
      return `
      
        <div class="cards">
        <img  class="posters" src="${element.img}" alt="Pôster de ${element.name}">
          <p id="film-title" class="film-info">${element.name}</p>
          <p class="film-info">${element.description}</p>
          <p class="film-info">${element.vehicle_class}</p>
          <p class="film-info">${element.length}</p>
          
        </div>
      `;
    })
    .join("");

  animationCards.innerHTML = vehiclesAnimationCards;
}
