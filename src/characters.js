import data from "./data/ghibli/ghibli.js";
import { films } from "./data.js";

const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");

export function showCharactersByFilm(index) {
  const charactersByFilm = films.filterCharacterByFilm(allAnimations, index);

  const animationsTotal = document.getElementById("label-total");
  animationsTotal.innerHTML = `${allAnimations[index].title} animation has 
  ${allAnimations[index].people.length} characters`;

  const charactersAnimationCards = charactersByFilm
    .map((element) => {
      let imageURL = element.img;
      
      const xhr = new XMLHttpRequest();
      xhr.open("GET", imageURL);
      xhr.onload = function () {
        const imageStatus = xhr.status;
        console.log(imageStatus);
        if (imageStatus === 404) {
          imageURL = "./assets/studio-ghibli-logo.png";
        }
        
        const cardString = `
            <div class="char-cards">
              <div class="card-front">
                <img class="posters" src="${imageURL}" alt="Pôster de ${element.name}">
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
        animationCards.innerHTML += cardString;
      };
      xhr.send();
    })
    .join("");

  animationCards.innerHTML = charactersAnimationCards;

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
}
