import { Day } from '../day';

type NumberStringFound = {
  index: number;
  numberString: string;
};
class Day1 extends Day {
  constructor() {
    super(1);
  }

  numberStringMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  numberReplacementMap = {
    one: 'o1e',
    two: 't2o',
    three: 't3ree',
    four: 'f4ur',
    five: 'f5ve',
    six: 's6x',
    seven: 's7ven',
    eight: 'e8ght',
    nine: 'n9ne',
  };

  parseInput(input: string): string[] {
    return input.split('\n');
  }

  processLine(input: string): number {
    const characters = input.split('');
    const firstDigit = characters.find((c) => Number.isInteger(Number(c)));
    const lastDigit = characters
      .reverse()
      .find((c) => Number.isInteger(Number(c)));

    // could also map over the whole array casting to Number, then filter out the NaN, then take first and last (also 2 loops)
    if (!firstDigit) {
      throw new Error('digits not found in input string');
    }

    return Number(firstDigit + (lastDigit || firstDigit));
  }

  processNumberWordsByOrderInInput(input: string): NumberStringFound[] {
    const instances: NumberStringFound[] = [];
    Object.keys(this.numberStringMap).forEach((numberString) => {
      const index = input.indexOf(numberString);
      if (index > -1) {
        instances.push({
          index,
          numberString,
        });
      }
    });

    return instances.sort((ns1, ns2) => ns1.index - ns2.index);
  }

  convertNumberWords(input: string): string {
    const instances = this.processNumberWordsByOrderInInput(input);
    if (instances.length === 0) return input;

    const numberString = instances[0]
      .numberString as keyof typeof this.numberStringMap;

    const output = input.replace(
      numberString,
      this.numberReplacementMap[numberString]
    );
    return this.convertNumberWords(output);
  }

  solveForPartOne(input: string): string {
    // split into lines
    const lines = this.parseInput(input);

    const calibrationValues = lines.map((l) => this.processLine(l));

    const sum = calibrationValues.reduce((acc, cur) => acc + cur, 0);

    return sum.toString();
  }

  solveForPartTwo(input: string): string {
    // split into lines
    const lines = this.parseInput(input);

    // The right calibration values for string "eighthree" is 83 and for "sevenine" is 79.

    const calibrationValues = lines
      .map((l) => this.convertNumberWords(l))
      .map((l) => this.processLine(l));

    const sum = calibrationValues.reduce((acc, cur) => acc + cur, 0);

    return sum.toString();
  }
}

export default new Day1();
