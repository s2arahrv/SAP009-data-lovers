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
      const index = this.id;
      modal_container.classList.add("show");
      showDescription(dataList, index);
    });
  });
}

createElement();
// INICIO DA IDEIA DE CALCULO AGREGADO
// STATUS: FUNCIONA
// SUGESTAO PRECISA IR UM PEDAÇO PRA DATA.JS / pode ser chamada por eventlistener (aí tirar linha 151))
function createElement() {
  const parentDiv = document.querySelector(".bottom-info");
  const childDiv = document.querySelector(".filter-type");
  const animationsTotal = document.createElement("div");
  animationsTotal.id = "label-total";
  // animationsTotal.classList.add("list-container");
  animationsTotal.classList.add("calc-result");

  animationsTotal.innerHTML =
    "Total number of animations produced by Studio Ghibli: " +
    allAnimations.length;
  parentDiv.appendChild(animationsTotal, childDiv);
}

function searchFilms() {
  const filteredCards = films.filterBySearchInput(
    allAnimations,
    searchInput.value
  );
  filterTypeLabel.innerHTML = "Search By Name";
  showAnimations(filteredCards);
}

//ESTAMOS USANDO ESSA FUNCAO PARA O MODAL
function showDescription(dataList, index) {
  const chosenAnimation = dataList[index];

  let imageURL = chosenAnimation.poster;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", imageURL);
  xhr.onload = function () {
    const imageStatus = xhr.status;

    if (imageStatus === 404) {
      imageURL = "./assets/studio-ghibli-logo-small.png";
    } else {
      imageURL = chosenAnimation.poster;
    }

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = `
  <div class="modal">
  <div class="modal-side-left">
  <img id="${index}" class="posters" src="${imageURL}" alt="Pôster de ${chosenAnimation.title}">
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
      const charactersFilmArray = dataList[index].people;
      showCharactersByFilm(charactersFilmArray, chosenAnimation);
      filterTypeLabel.innerHTML = "Characters";
      filterButton.value = "Characters from A-Z";
    });

    vehiclesButton.addEventListener("click", function () {
      const vehiclesButtonId = this.id;
      const index = vehiclesButtonId.split("-").pop();
      modal_container.classList.remove("show");
      const vehiclesFilmArray = dataList[index].vehicles;
      showVehiclesByFilm(vehiclesFilmArray);
    });

    locationsButton.addEventListener("click", function () {
      const locationsButtonId = this.id;
      const index = locationsButtonId.split("-").pop();
      modal_container.classList.remove("show");
      const locationsFilmArray = dataList[index].locations;
      showLocationByFilm(locationsFilmArray);
    });
  };

  xhr.send();
}

//essa função pode ser mudada para receber diferentes filtros e passar pra
//proxima funcao de exibição

function defineAlphabeticalFilter(event) {
  event.preventDefault();
  let alphabeticalFilter = null;

  if (filterButton.value === "Show films from A - Z") {
    alphabeticalFilter = films.alphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from Z - A";
    filterTypeLabel.innerHTML = "Animations from A - Z";
  } else if (filterButton.value === "Show films from Z - A") {
    alphabeticalFilter = films.inverseAlphabeticOrderFilter(allAnimations);
    filterButton.value = "Show films from A - Z";
    filterTypeLabel.innerHTML = "Animations from Z - A";
  }
  showAnimations(alphabeticalFilter);
}

// PENSAR ONDE COLOCAR O BACKBUTTON - NO MOMENTO É FILHA DA DIV.BOTTOM-INFO

function showLocationByFilm(locationsArray) {
  //const chosenAnimation = allAnimations[index].locations;
  const locationsByFilm = films.filterLocationByFilm(locationsArray);

  const parentDiv = document.querySelector(".bottom-info");
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.innerHTML = `<input type="submit" id="back-button" class="filter-button buttons" value="Back"/>`;

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
function showVehiclesByFilm(vehiclesArray) {
  const vehiclesByFilm = films.filterVehiclesByFilm(vehiclesArray);
  // const vehiclesByFilmArray = vehiclesArray[0];

  const parentDiv = document.querySelector(".bottom-info");
  const animationsTotal = document.createElement("div");
  animationsTotal.classList.add("list-container");
  animationsTotal.innerHTML = `<input type="submit" id="back-button" class="filter-button buttons" value="Back"/>`;

  parentDiv.appendChild(animationsTotal);
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

function show(value) {
  document.querySelector(".text-box").value = value;
}

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};
const mySelect = document.getElementById("mySelect");

frop();
function frop(){
const items = ["Option 1", "Option 2", "Option 3"];

// Loop através dos itens da array e adiciona uma opção para cada um
for (let i = 0; i < items.length; i++) {
  const option = document.createElement("option"); // Cria um elemento option
  option.text = items[i]; // Define o texto da opção
  option.value = items[i]; // Define o valor da opção
  mySelect.add(option); // Adiciona a opção ao select
}
//const mySelect = document.getElementById("mySelect");
}
mySelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  const selectedKey =
    event.target.options[event.target.selectedIndex].getAttribute("key");
  // const selectedKey = event.target.options[event.target.selectedIndex].dataset.key;
  console.log(`Selected value: ${selectedKey}`);
 // const items = getAllValuesByKey(allAnimations, selectedKey);
 // console.log(items);
  // Loop através dos itens da array e adiciona uma opção para cada um
 

  const lula = films.filterDrop(allAnimations, selectedKey, selectedValue);
  console.log(lula);
  showAnimations(lula);
});

function getAllValuesByKey(dataFilms, key) {
  const values = dataFilms
    .filter((film) => film[key] !== undefined)
    .map((film) => film[key]);
  const arraySemRepetidos = [...new Set(values)];
  console.log(arraySemRepetidos);
  return arraySemRepetidos;
}
