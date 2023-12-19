import day5, { Map } from './index';

describe('On Day 5', () => {
  it.todo('parses input into seeds and maps');

  it(`gets destination value from maps`, () => {
    const MAPS: Map[] = [
      {
        sourceStart: 98,
        destinationStart: 50,
        rangeLength: 2,
      },
      {
        sourceStart: 50,
        destinationStart: 52,
        rangeLength: 48,
      },
    ];

    // exact source start
    expect(day5.getDestinationValue(98, MAPS)).toBe(50);
    // ending value
    expect(day5.getDestinationValue(99, MAPS)).toBe(51);
    // not found should return source value
    expect(day5.getDestinationValue(100, MAPS)).toBe(100);
    expect(day5.getDestinationValue(101, MAPS)).toBe(101);
    expect(day5.getDestinationValue(9999, MAPS)).toBe(9999);

    // source start
    expect(day5.getDestinationValue(50, MAPS)).toBe(52);
    // in between
    expect(day5.getDestinationValue(51, MAPS)).toBe(53);
    // ending value
    expect(day5.getDestinationValue(97, MAPS)).toBe(99);
  });

  it.todo(
    `given a seed, and maps, traverses maps through mapping order to add values for seed`
  );
});
