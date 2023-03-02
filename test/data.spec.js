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

const charactersI = [
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

const charactersO = [
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

const locationI = [
  {
    id: "6ba60a86-7c74-4ec4-a6f4-7112b5705a2f",
    name: "Gondoa",
    img: "https://static.wikia.nocookie.net/studio-ghibli/images/2/25/Thumbnail-8.jpeg",
    climate: "TODO",
    terrain: "TODO",
    surface_water: "40",
    residents: ["TODO"],
  },
];

const locationO = [
  {
    id: "6ba60a86-7c74-4ec4-a6f4-7112b5705a2f",
    name: "Gondoa",
    img: "https://static.wikia.nocookie.net/studio-ghibli/images/2/25/Thumbnail-8.jpeg",
    climate: "TODO",
    terrain: "TODO",
    surface_water: "40",
    residents: ["TODO"],
  },
];

const vehiclesI = [
  {
    id: "d8f893b5-1dd9-41a1-9918-0099c1aa2de8",
    name: "Red Wing",
    img: "https://static.wikia.nocookie.net/studio-ghibli/images/8/8f/Porco%27s_Plane.jpg",
    description:
      "An experimental aircraft captured by Porco. Named Savoia S.21",
    vehicle_class: "Airplane",
    length: "20",
    pilot: {
      id: "6523068d-f5a9-4150-bf5b-76abe6fb42c3",
      name: "Porco Rosso",
    },
  },
];

const vehiclesO = [
  {
    id: "d8f893b5-1dd9-41a1-9918-0099c1aa2de8",
    name: "Red Wing",
    img: "https://static.wikia.nocookie.net/studio-ghibli/images/8/8f/Porco%27s_Plane.jpg",
    description:
      "An experimental aircraft captured by Porco. Named Savoia S.21",
    vehicle_class: "Airplane",
    length: "20",
    pilot: {
      id: "6523068d-f5a9-4150-bf5b-76abe6fb42c3",
      name: "Porco Rosso",
    },
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

describe("films.filterCharacterByFilm", () => {
  it("is a function", () => {
    expect(typeof films.filterCharacterByFilm).toBe("function");
  });

  it("is a object", () => {
    expect(typeof charactersI).toBe("object");
  });

  it("is a array", () => {
    expect(Array.isArray(charactersI)).toBe(true);
  });

  it("returns an array with all characters info of the chosen film", () => {
    expect(films.filterCharacterByFilm(charactersI)).toEqual(charactersO);
  });
});

// });

describe("films.filterLocationByFilm", () => {
  it("is a function", () => {
    expect(typeof films.filterLocationByFilm).toBe("function");
  });

  it("is a object", () => {
    expect(typeof locationO).toBe("object");
  });

  it("is a array", () => {
    expect(Array.isArray(locationO)).toBe(true);
  });

  it("returns an array with all locations info of the chosen film", () => {
    expect(films.filterLocationByFilm(locationI)).toEqual(locationO);
  });
});

describe("films.filterVehiclesByFilm", () => {
  it("is a function", () => {
    expect(typeof films.filterVehiclesByFilm).toBe("function");
  });

  it("is a object", () => {
    expect(typeof vehiclesO).toBe("object");
  });

  it("is a array", () => {
    expect(Array.isArray(vehiclesO)).toBe(true);
  });

  it("returns an array with all locations info of the chosen film", () => {
    expect(films.filterVehiclesByFilm(vehiclesI)).toEqual(vehiclesO);
  });
});

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
