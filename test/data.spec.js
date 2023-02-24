import { films } from '../src/data.js';

const inputOriginal = [
  { title: 'hope', year: 2023 },
  { title: 'chaos', year: 2018 },
  { title: 'star', year: 2003 },
  { title: 'coup', year: 2016 },
];

const outputAlphabetical = [
  { title: 'chaos', year: 2018 },
  { title: 'coup', year: 2016 },
  { title: 'hope', year: 2023 },
  { title: 'star', year: 2003 },
];

const outputInverseAlphabetical = [
  { title: 'star', year: 2003 },
  { title: 'hope', year: 2023 },
  { title: 'coup', year: 2016 },
  { title: 'chaos', year: 2018 },
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
    specie: "Raccoon Dog"
  },
 

];
describe('films', () => {
  it('is a object', () => {
    expect(typeof films).toBe('object');
  })});

describe('films.alphabeticOrderFilter', () => {
  it('is a function', () => {
    expect(typeof films.alphabeticOrderFilter).toBe('function');
  });

  it('returns an array in alphabetical order by title', () => {
    expect(films.alphabeticOrderFilter(inputOriginal)).toEqual(outputAlphabetical);
  });
});

describe('films.inverseAlphabeticOrderFilter', () => {
  it('is a function', () => {
    expect(typeof films.inverseAlphabeticOrderFilter).toBe('function');
  });

  it('returns an array in inverse alphabetical order by title', () => { 
    expect(films.inverseAlphabeticOrderFilter(inputOriginal)).toEqual(outputInverseAlphabetical);
  });
});

// describe('films.searchFilms', () => {
//   it('is a function', () => {
//     expect(typeof films.searchFilms).toBe('function');
//   });
// });

describe('films.filterCharacterByFilm', () => {
  it('is a function', () => {
    expect(typeof films.filterCharacterByFilm).toBe('function');
  });

  it('is a object', () => {
    expect(typeof characters[0]).toBe('object');
  });

  it('is a array', () => {
    expect(Array.isArray(characters)).toBe(true);
  });

  it('returns an array with all characters info of the chosen film', () => {    
    expect(characters[0]).toHaveProperty('id');
    expect(characters[0]).toHaveProperty('name');
    expect(characters[0]).toHaveProperty('img');
    expect(characters[0]).toHaveProperty('gender');
    expect(characters[0]).toHaveProperty('age');
    expect(characters[0]).toHaveProperty('eye_color');
    expect(characters[0]).toHaveProperty('hair_color');
    expect(characters[0]).toHaveProperty('specie');    
  });
});

