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
      { title: 'dog', year: 2020 },
      { title: 'cat', year: 2019 },
      { title: 'apple', year: 2021 },
      { title: 'banana', year: 2022 },
    ];
    const expectedOutput = [
      { title: 'apple', year: 2021 },
      { title: 'banana', year: 2022 },
      { title: 'cat', year: 2019 },
      { title: 'dog', year: 2020 },
    ];
    expect(films.alphabeticOrderFilter(input)).toEqual(expectedOutput);
  });
});

