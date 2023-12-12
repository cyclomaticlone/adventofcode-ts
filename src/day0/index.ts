import { Day } from '../day';

class Day0 extends Day {
  constructor() {
    super(0);
  }

  parseInput(input: string): string[] {
    return input.split('\n');
  }

  solveForPartOne(input: string): string {
    const lines = this.parseInput(input);
    return '';
  }

  solveForPartTwo(input: string): string {
    const lines = this.parseInput(input);
    return '';
  }
}

export default new Day0();
