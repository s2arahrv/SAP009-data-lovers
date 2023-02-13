import { films } from '../src/data.js';

describe('films', () => {
  it('debería ser un objeto', () => {
    expect(typeof films).toBe('object');
  })});

describe('films.alphabeticOrderFilter', () => {
  it('is a function', () => {
    expect(typeof films.alphabeticOrderFilter).toBe('function');
  });

  it('returns an array in alphabetical order by title', () => {
    const input = [
      { title: 'hope', year: 2023 },
      { title: 'chaos', year: 2018 },
      { title: 'star', year: 2003 },
      { title: 'coup', year: 2016 },
    ];
    const expectedOutput = [
      { title: 'chaos', year: 2018 },
      { title: 'coup', year: 2016 },
      { title: 'hope', year: 2023 },
      { title: 'star', year: 2003 },
    ];
    expect(films.alphabeticOrderFilter(input)).toEqual(expectedOutput);
  });
});

describe('films.inverseAlphabeticOrderFilter', () => {
  it('is a function', () => {
    expect(typeof films.inverseAlphabeticOrderFilter).toBe('function');
  });

  it('returns an array in inverse alphabetical order by title', () => {
    const input = [
      { title: 'hope', year: 2023 },
      { title: 'chaos', year: 2018 },
      { title: 'star', year: 2003 },
      { title: 'coup', year: 2016 },
    ];
    const expectedOutput = [
      { title: 'star', year: 2003 },
      { title: 'hope', year: 2023 },
      { title: 'coup', year: 2016 },
      { title: 'chaos', year: 2018 },
    ];
    expect(films.inverseAlphabeticOrderFilter(input)).toEqual(expectedOutput);
  });
});

describe('films.searchFilms', () => {
  it('is a function', () => {
    expect(typeof films.searchFilms).toBe('function');
  });
});

