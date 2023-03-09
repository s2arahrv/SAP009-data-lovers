import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";
import { showCharactersByFilm, showAllCharacters } from "./characters.js";

const allAnimations = data.films;

const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", defineAlphabeticalFilter);

const showAllCharactersButton = document.getElementById(
  "filter-button-character"
);
showAllCharactersButton.addEventListener("click", showAllCharacters);

const characterAZButton = document.getElementById("filter-button-character");

const filterTypeLabel = document.getElementById("label-filter-type");

const animationTotal = document.querySelectorAll("#label-total");

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
  <p class="film-info">Director: ${chosenAnimation.director}<br>Producer: ${chosenAnimation.producer}<br>Release Date: ${chosenAnimation.release_date}<br>Rotten Tomatoes Score: ${chosenAnimation.rt_score}</p>
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
    const calcLabel = document.getElementById("label-total");
    calcLabel.classList.add("list-container");

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
      filterTypeLabel.innerHTML = `Vehicles from ${dataList[index].title}`;
      calcLabel.innerHTML = ``;
    });

    locationsButton.addEventListener("click", function () {
      const locationsButtonId = this.id;
      const index = locationsButtonId.split("-").pop();
      modal_container.classList.remove("show");
      const locationsFilmArray = dataList[index].locations;
      showLocationByFilm(locationsFilmArray);
      filterTypeLabel.innerHTML = `Locations from ${dataList[index].title}`;

      calcLabel.innerHTML = ``;
    });

    characterAZButton.classList.add("hide");
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

  
  animationTotal.innerHTML =
    "Total number of animations produced by Studio Ghibli: " +
    allAnimations.length;

  showAnimations(alphabeticalFilter);
}

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
          <p class="film-info-description">${element.description}</p>
          <p class="film-info">Class: ${element.vehicle_class}</p>
          <p class="film-info">Length: ${element.length}</p>
          
          
        </div>
      `;
    })
    .join("");

  animationCards.innerHTML = vehiclesAnimationCards;
}
const mySelect = document.getElementById("drop-director");
showFilmsByDirector();

function showFilmsByDirector() {
  const items = getAllValuesByKey(allAnimations, "director");

  for (let i = 0; i < items.length; i++) {
    const option = document.createElement("option");
    option.text = items[i];
    option.value = items[i];
    option.setAttribute("key", "director");
    mySelect.add(option);
  }
}

function getAllValuesByKey(dataFilms, key) {
  const values = dataFilms
    .filter((film) => film[key] !== undefined)
    .map((film) => film[key]);
  // eslint-disable-next-line no-undef
  const arrayDirectors = [...new Set(values)];
  return arrayDirectors;
}

mySelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  const selectedKey =
    event.target.options[event.target.selectedIndex].getAttribute("key");
  const filmsByDirector = films.filterByDirector(
    allAnimations,
    selectedKey,
    selectedValue
  );

  showAnimations(filmsByDirector);
  filterTypeLabel.innerHTML = `${selectedValue} Films`;
  const directorsTotalFilms = document.getElementById("label-total");
  directorsTotalFilms.classList.add("list-container");

  directorsTotalFilms.innerHTML = `Number of animations directed by ${selectedValue}: ${filmsByDirector.length}`;
});
