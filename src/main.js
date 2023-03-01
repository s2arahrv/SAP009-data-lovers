import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";
import { showCharactersByFilm } from "./characters.js";

const allAnimations = data.films;

const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", defineAlphabeticalFilter);

const filterTypeLabel = document.getElementById("label-filter-type");

const searchInput = document.getElementById("filter-name-input");
searchInput.addEventListener("keyup", searchFilms);

const animationCards = document.querySelector(".animation-cards");

const modal_container = document.getElementById("modal-wrapper");

const posterImage = document.querySelectorAll(".posters");
posterImage.forEach((img) => {
  img.addEventListener("click", function () {
    const index = this.id;
    modal_container.classList.add("show");
    showDescription(index);
  });
});

showAnimations(allAnimations);

function showAnimations(animationArray) {
  const dataList = animationArray;
  const animationData = dataList
    .map(
      (animation, index) =>
        `
      <div class="cards">
      <img id="${index}" class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
      <p id="film-title" class="film-info-title">${animation.title} </p>
      <p class="film-info"> ${animation.release_date}</p>
      </div>
      `
    )
    .join("");

  animationCards.innerHTML = animationData;

  const posterImage = document.querySelectorAll(".posters");
  posterImage.forEach((img) => {
    img.addEventListener("click", function () {
      alert("modal-animation-description");
      const index = this.id;
      modal_container.classList.add("show");
      showDescription(index);
    });
  });
}

//ESTAMOS USANDO ESSA FUNCAO PARA O MODAL
function showDescription(index) {
  const chosenAnimation = allAnimations[index];

  const imageURL = chosenAnimation.poster;
  let imageAnimation = null;
  
  const xhr = new XMLHttpRequest();
  xhr.open("GET", imageURL);
  xhr.onload = function () {
    const imageStatus = xhr.status;
  
    if (imageStatus === 404) {    
      imageAnimation = "./assets/studio-ghibli-logo.png";      
    } else {    
      imageAnimation = chosenAnimation.poster;      
    }

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = `
  <div class="modal">
  <div class="modal-side-left">
  <img id="${index}" class="posters" src="${imageAnimation}" alt="Pôster de ${chosenAnimation.title}">
  <p class="modal-title">${chosenAnimation.title}</p>
  <p class="film-info">Director: ${chosenAnimation.director}<br>Producer: ${chosenAnimation.producer}<br>Release: ${chosenAnimation.release_date}<br>RT Score: ${chosenAnimation.rt_score}</p>
  </div>
  <div class="modal-side-right">
  <p class="modal-title">Synopsis</p>
  <p class="film-info">${chosenAnimation.description}</p>
  <p class="more-info">For more information:</p>
  <button class="buttons more-info-bts" id="characters-button-${index}">Characters</button>
  <button class="buttons more-info-bts" id="locations-button-${index}">Locations</button>
  <button class="buttons more-info-bts" id="vehicles-button-${index}">Vehicles</button>
  <button class="buttons" id="close">Go back</button>
  </div>
  </div>`;

    modal_container.classList.add("show");

    const close = document.getElementById("close");
    close.addEventListener("click", () => {
      modal_container.classList.remove("show");
    });

    const characterButton = document.getElementById(
      "characters-button-" + index
    );
    const vehiclesButton = document.getElementById("vehicles-button-" + index);
    const locationsButton = document.getElementById(
      "locations-button-" + index
    );

    const charactersArray = chosenAnimation.people;
    const vehiclesArray = chosenAnimation.vehicles;
    const locationsArray = chosenAnimation.locations;

    if (charactersArray.length > 0) {
      characterButton.classList.add("show");
    }

    if (vehiclesArray.length > 0) {
      vehiclesButton.classList.add("show");
    }

    if (locationsArray.length > 0) {
      locationsButton.classList.add("show");
    }

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
  };

  //   //console.log(xhr.status); // retorna o código de status HTTP
  // };
  xhr.send();

  console.log(imageURL);
}

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
  showAnimations(alphabeticalFilter);
}

createElement();

// INICIO DA IDEIA DE CALCULO AGREGADO
// STATUS: FUNCIONA
// SUGESTAO PRECISA IR UM PEDAÇO PRA DATA.JS / pode ser chamada por eventlistener (aí tirar linha 151))
function createElement() {
  const parentDiv = document.querySelector(".bottom-info");
  const childDiv = document.querySelector(".filter-type");
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.classList.add("calc-result");
  animationsTotal.innerHTML =
    "Total number of animations produced by Studio Ghibli: " +
    allAnimations.length;
  parentDiv.insertBefore(animationsTotal, childDiv);
}

function searchFilms() {
  const filteredCards = films.filterBySearchInput(
    allAnimations,
    searchInput.value
  );
  console.log(filteredCards);
  showAnimations(filteredCards);
}

// NOVA FUNCAO DE FILTRO DE PERSONAGENS POR FILME
// PENSAR ONDE COLOCAR O BACKBUTTON - NO MOMENTO É FILHA DA DIV.BOTTOM-INFO

// function showLocationByFilm(index) {
//   const locationsByFilm = films.filterLocationByFilm(allAnimations, index);

//   const parentDiv = document.querySelector(".bottom-info");
//   const animationsTotal = document.createElement("div");
//   animationsTotal.classList.add("list-container");
//   animationsTotal.innerHTML = `<button id="back-button">Go Back</button>`;

//   parentDiv.appendChild(animationsTotal);
//   const backButton = document.querySelector("#back-button");
//   backButton.addEventListener("click", () => {
//     history.pushState(null, null, document.referrer);
//     window.location.reload();
//   });

//   const animationCardsLocation = locationsByFilm
//     .map((element) => {
//       return `
//     <div class="cards">
//     <img class="posters" src="${element.img}" alt="Pôster de ${element.name}">
//     <p id="film-title" class="film-info">${element.name}</p>
//     <p class="film-info">Climate: ${element.climate}<br>Terrain: ${element.terrain}<br>Surface water: ${element.surface_water}</p>
//     </div>
//     `;
//     })
//     .join("");

//   animationCards.innerHTML = animationCardsLocation;
// }

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