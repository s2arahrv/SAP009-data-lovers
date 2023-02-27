import { films } from "../src/data.js";

const inputOriginal = [
  { title: "hope", year: 2023 },
  { title: "chaos", year: 2018 },
  { title: "star", year: 2003 },
  { title: "coup", year: 2016 },
];

const outputAlphabetical = [
  { title: "chaos", year: 2018 },
  { title: "coup", year: 2016 },
  { title: "hope", year: 2023 },
  { title: "star", year: 2003 },
];

const outputInverseAlphabetical = [
  { title: "star", year: 2003 },
  { title: "hope", year: 2023 },
  { title: "coup", year: 2016 },
  { title: "chaos", year: 2018 },
];

const characters = [
  {
    id: "575d6943-f9da-445e-8e77-e118c3924a1d",
    name: "Shoukichi",
    img: "https://static.wikia.nocookie.net/studio-ghibli/images/5/59/Shoukichi_1.jpg",
    gender: "Male",
    age: "Adult",
    eye_color: "Black",
    hair_color: "Brown",
    specie: "Raccoon Dog",
  },
];

const movie = [
  {
    "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    "title": "Castle in the Sky",
    "people": [
      {
        "id": "fe93adf2-2f3a-4ec4-9f68-5422f1b87c01",
        "name": "Pazu",
        "img": "https://static.wikia.nocookie.net/studio-ghibli/images/8/8b/Pazu.jpg",
        "gender": "Male",
        "age": "13",
        "eye_color": "Black",
        "hair_color": "Brown",
        "specie": "Human"
      },
    ],
    "locations": [
      {
        "id": "6ba60a86-7c74-4ec4-a6f4-7112b5705a2f",
        "name": "Gondoa",
        "img": "https://static.wikia.nocookie.net/studio-ghibli/images/2/25/Thumbnail-8.jpeg",
        "climate": "TODO",
        "terrain": "TODO",
        "surface_water": "40",
      },
    ],
  },
];

describe("films", () => {
  it("is a object", () => {
    expect(typeof films).toBe("object");
  });
});

describe("films.alphabeticOrderFilter", () => {
  it("is a function", () => {
    expect(typeof films.alphabeticOrderFilter).toBe("function");
  });

  it("returns an array in alphabetical order by title", () => {
    expect(films.alphabeticOrderFilter(inputOriginal)).toEqual(
      outputAlphabetical
    );
  });
});

describe("films.inverseAlphabeticOrderFilter", () => {
  it("is a function", () => {
    expect(typeof films.inverseAlphabeticOrderFilter).toBe("function");
  });

  it("returns an array in inverse alphabetical order by title", () => {
    expect(films.inverseAlphabeticOrderFilter(inputOriginal)).toEqual(
      outputInverseAlphabetical
    );
  });
});

// describe('films.searchFilms', () => {
//   it('is a function', () => {
//     expect(typeof films.searchFilms).toBe('function');
//   });
// });

// describe('films.filterBySearchInput', () => {
//   const cards = [
//     { querySelector: () => ({ innerText: 'My Neighbor Totoro' }) },
//     { querySelector: () => ({ innerText: 'Spirited Away' }) },
//     { querySelector: () => ({ innerText: 'Howl\'s Moving Castle' }) }
//   ];
//   const input = 'totoro';

//   // Act
//   const result = films.filterBySearchInput(cards, input);

//   // Assert
//   expect(result).toEqual([{ querySelector: () => ({ innerText: 'My Neighbor Totoro' }) }]);
// });

describe("films.filterBySearchInput", () => {
  it("is a function", () => {
    expect(typeof films.filterBySearchInput).toBe("function");
  });

  it("should return an array of cards that contain the search term in the title", () => {
    const input = "hope";
    const result = films.filterBySearchInput(inputOriginal, input);

    expect(result.length).toEqual(1);
    expect(result[0].title).toEqual(input);
  });
});

describe("films.filterCharacterByFilm", () => {
  it("is a function", () => {
    expect(typeof films.filterCharacterByFilm).toBe("function");
  });

  it("is a object", () => {
    expect(typeof characters[0]).toBe("object");
  });

  it("is a array", () => {
    expect(Array.isArray(characters)).toBe(true);
  });

  /*it("returns an array with all characters info of the chosen film", () => {
    expect(characters[0]).toHaveProperty("id");
    expect(characters[0]).toHaveProperty("name");
    expect(characters[0]).toHaveProperty("img");
    expect(characters[0]).toHaveProperty("gender");
    expect(characters[0]).toHaveProperty("age");
    expect(characters[0]).toHaveProperty("eye_color");
    expect(characters[0]).toHaveProperty("hair_color");
    expect(characters[0]).toHaveProperty("specie");
  });*/

  it("returns an array with all the characters info of the chosen film", () => {
    const result = films.filterCharacterByFilm(movie, [0]);
    const people = movie.people;

    expect(result.people).toEqual(people);
  });
});

describe("films.filterLocationByFilm", () => {
  it("is a function", () => {
    expect(typeof films.filterLocationByFilm).toBe("function");
  });

  it("returns an array with all the location info of the chosen film", () => {
    const result = films.filterLocationByFilm(movie, [0]);
    const location = movie.locations;

    expect(result.locations).toEqual(location);
  });
});

