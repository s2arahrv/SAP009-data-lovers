import data from "./data/ghibli/ghibli.js";
import { films } from "./data2.js";

const allAnimations = data.films;
const animationCards = document.querySelector(".animation-cards");
const cards = document.querySelector('[id^="animation-"]');

const filterButton = document.getElementById("filter-button");
const filterType = document.getElementById("label-filter-type");

filterButton.addEventListener("click", defineAlphabeticalFilter);

const inputArea = document.getElementById("filter-name-input");
inputArea.addEventListener("keyup", search);

document.querySelector(".animation-cards").innerHTML =
  showAnimations(allAnimations);

console;
const images = document.querySelectorAll(".posters");

images.forEach((img) => {
  img.addEventListener("click", function () {
    const index = this.id;
    // chame a função desejada e passe o índice como um parâmetro

    showDescription(index);
    //   minhaFuncao(index);
  });
});

// const animationElements = document.querySelectorAll(".cards");
// animationElements.forEach((element, index) => {
//   element.addEventListener("click", () => showDescription(index));
// });

//Nesse exemplo, a função showDescription é chamada no evento de clique do elemento .cards, que passa o índice da animação como argumento. A função usa esse índice para obter a descrição correspondente e, em seguida, seleciona a div de descrição correspondente usando a ID da string interpolada. Em seguida, ele define o conteúdo da div como a descrição usando a string interpolada novamente.


//1602 - APAGA A IMAGEM, MOSTRA A DIV, UMA EM CIMA DA OUTRA
// PRECISO APAGAR TODA A DIV DE BAIXO E MANDAR APARECER DE NOVO
//OU CRIAR UMA DIV QUE COBRE TUDO
// function showDescription(index) {
//   console.log(index);
//   const anima = index;
//   const description = anima.description;
//   const caca = document.getElementById(index);
//   caca.classList.add("hidden");

//   const num = parseInt(anima.split("-")[2]);
//   console.log(num); // output: 2

//   const descriptionElement = document.getElementById(`description-${num}`);
//   console.log(allAnimations[num].producer);
//   descriptionElement.innerHTML = `

    
//     <div id="animation-${index}" class="cards">
  
//     <p id="film-title" class="film-info">${allAnimations[num].producer} </p>
//     <p class="film-info"> ${allAnimations[num].director}</p>
    
//     </div>
//   `;
// }


//aqui mudei a classe pra cards 1 com width de 500px
//ainda nao achei como posicionar, mas a ideia é colocar um x pra fechar 

function showDescription(index) {
  console.log(index);
  const anima = index;
  const description = anima.description;
  const caca = document.getElementById(index);
  caca.classList.add("hidden");

  const num = parseInt(anima.split("-")[2]);
  console.log(num); // output: 2

  const descriptionElement = document.getElementById(`description-${num}`);
  console.log(allAnimations[num].producer);
  descriptionElement.innerHTML = `

    
    <div id="animation-${index}" class="cards1" >
  
    <p id="film-title" class="film-info">${allAnimations[num].producer} </p>
    <p class="film-info"> ${allAnimations[num].director}</p>
    
    </div>
  `;
}

// function showAnimations(allAnimations) {
//   return allAnimations
//     .map(
//       (animation) =>
//         `
//       <div class="cards">
//       <img id="link-image" class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
//       <p id="film-title" class="film-info">${animation.title} </p>
//       <p class="film-info"> ${animation.release_date}</p>
//       </div>
//       `
//     )
//     .join("");
// }

function showAnimations(allAnimations) {
  return allAnimations
    .map(
      (animation, index) =>
        `
      <div id="animation-${index}" class="cards">
      <img id="link-image-${index}" class="posters" src="${animation.poster}" alt="Pôster de ${animation.title}">
      <p id="film-title" class="film-info">${animation.title} </p>
      <p class="film-info"> ${animation.release_date}</p>
      <div id="description-${index}" class="description"></div>
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

function search() {
  const input = document
    .getElementById("filter-name-input")
    .value.toUpperCase();
  //Chamar cards do HTML
  const cards = document.getElementsByClassName("cards");

  //Iterar por todos os cards e selecionar os títulos pelo index de cada um
  for (let i = 0; i < cards.length; i++) {
    const titles = cards[i].querySelector("#film-title");
    console.log(titles);

    //Checar o texto do título em uppercase e o index de input no array
    if (titles.innerText.toUpperCase().indexOf(input) > -1) {
      //Retornar o card do array se o index for válido, ou seja, existir no array (igual ou maior que 0)
      cards[i].style.display = "";
    } else {
      //Se o index for inválido, o display será nulo, e nada aparecerá
      cards[i].style.display = "none";
    }
  }
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

// function createElement(data) {
//   const parentDiv = document.querySelector(".bottom-info");
//   const childDiv = document.querySelector(".filter-type");
//   const animationsTotal = document.createElement("div");
//   animationsTotal.classList.add("list-container");
//   animationsTotal.innerHTML =
//     "Total number of animations produced by Studio Ghibli: " + data.length;
//   parentDiv.insertBefore(animationsTotal, childDiv);
// }

// createElement(allAnimations);
