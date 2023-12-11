import { Day } from '../day';

type PartNumber = {
  indexStart: number;
  indexEnd: number;
  value: number;
  isValidPart: boolean;
};

type Parts = {
  [key: number]: PartNumber[];
};

type Gear = {
  index: number;
  part1Number?: number;
  part2Number?: number;
  isValidGear: boolean;
};

// should there be an GearUnchecked and GearChecked?

type Gears = {
  [key: number]: Gear[];
};

class Day3 extends Day {
  constructor() {
    super(3);
  }

  parseInputToLines(input: string): string[] {
    return input.split('\n');
  }

  parseLineToPartNumbers(line: string): PartNumber[] {
    const parts: PartNumber[] = [];
    let partNumber: PartNumber = {
      indexStart: 0,
      indexEnd: 0,
      value: 0,
      isValidPart: false,
    };

    line.split('').forEach((c, i) => {
      // if number and no previus value, set indexStart and value
      if (!isNaN(Number(c)) && partNumber.value === 0) {
        partNumber.indexStart = i;
        partNumber.value = Number(c);
        return;
        // else add to value
      } else if (!isNaN(Number(c))) {
        partNumber.value = Number(`${partNumber.value}${c}`);
      } else if (partNumber.value > 0) {
        partNumber.indexEnd = i - 1;
        parts.push(partNumber);
        partNumber = {
          indexStart: 0,
          indexEnd: 0,
          value: 0,
          isValidPart: false,
        };
      }
    });

    if (partNumber.value > 0) {
      partNumber.indexEnd = line.length;
      parts.push(partNumber);
    }
    return parts;
  }

  parseLineToGears(line: string): Gear[] {
    const gears: Gear[] = [];

    line.split('').forEach((c, i) => {
      if (c === '*') {
        gears.push({
          index: i,
          isValidGear: false,
        });
      }
    });

    return gears;
  }

  isValidSymbol(character: string) {
    return character !== '.' && isNaN(Number(character));
  }

  checkSameLineValidity(part: PartNumber, line: string) {
    if (
      part.indexStart > 0 &&
      this.isValidSymbol(line.at(part.indexStart - 1) || '')
    )
      return true;

    if (
      part.indexEnd < line.length &&
      this.isValidSymbol(line.at(part.indexEnd + 1) || '')
    )
      return true;

    return false;
  }

  checkAdjacentLineValidity(part: PartNumber, line: string) {
    const start = part.indexStart === 0 ? part.indexStart : part.indexStart - 1;
    const end =
      part.indexEnd === line.length - 1 ? part.indexEnd : part.indexEnd + 1;

    const charsToScan = line.slice(start, end + 1).split('');

    const isValid = charsToScan.some((c) => this.isValidSymbol(c));
    return isValid;
  }

  checkLinePartsForValidity(
    lineParts: PartNumber[],
    currentLine: string,
    previousLine: string | null,
    nextLine: string | null
  ) {
    return lineParts.map((part) => {
      if (this.checkSameLineValidity(part, currentLine)) {
        return {
          ...part,
          isValidPart: true,
        };
      } else if (
        previousLine &&
        this.checkAdjacentLineValidity(part, previousLine)
      ) {
        return {
          ...part,
          isValidPart: true,
        };
      } else if (nextLine && this.checkAdjacentLineValidity(part, nextLine)) {
        return {
          ...part,
          isValidPart: true,
        };
      }

      return part;
    });
  }

  checkSameLineGearValidity(gear: Gear, currentLineParts: PartNumber[]): Gear {
    // given gear at index x, check if there are parts next to it at x-1 and x+1
    const partBefore = currentLineParts.find(
      (p) => p.indexEnd === gear.index - 1
    );
    const partAfter = currentLineParts.find(
      (p) => p.indexStart === gear.index + 1
    );

    return {
      ...gear,
      part1Number: partBefore
        ? partBefore.value
        : partAfter
        ? partAfter.value
        : undefined,
      part2Number: partBefore && partAfter && partAfter.value,
    };
  }

  checkAdjacentLineGearValidity(
    gear: Gear,
    previousLineParts: PartNumber[] | null,
    nextLineParts: PartNumber[] | null
  ): Gear {
    //  gear is touching 2 same line parts
    if (gear.part1Number && gear.part2Number) return gear;
    function checkIfGearTouchingPart(gear: Gear, part: PartNumber): boolean {
      const touchingIndexes = Array.from(
        { length: part.value.toString().length + 2 },
        (v, i) => part.indexStart - 1 + i
      );
      return touchingIndexes.includes(gear.index);
    }

    const prevLinePart1 = previousLineParts
      ? previousLineParts.find((p) => {
          return checkIfGearTouchingPart(gear, p);
        })
      : null;
    const prevLinePart2 =
      previousLineParts && prevLinePart1
        ? previousLineParts
            .filter((p) => p.value !== prevLinePart1.value)
            .find((p) => {
              return checkIfGearTouchingPart(gear, p);
            })
        : null;
    const nextLinePart1 = nextLineParts
      ? nextLineParts.find((p) => {
          return checkIfGearTouchingPart(gear, p);
        })
      : null;
    const nextLinePart2 =
      nextLineParts && nextLinePart1
        ? nextLineParts
            .filter((p) => p.value !== nextLinePart1.value)
            .find((p) => {
              return checkIfGearTouchingPart(gear, p);
            })
        : null;

    const partsTouching = [
      prevLinePart1,
      prevLinePart2,
      nextLinePart1,
      nextLinePart2,
    ].filter((p) => p !== null && p !== undefined) as PartNumber[];

    return {
      ...gear,
      part1Number: gear.part1Number
        ? gear.part1Number
        : partsTouching[0]?.value,
      part2Number: gear.part1Number
        ? partsTouching[0]?.value
        : partsTouching[1]?.value,
    };
  }

  checkLineGearsForValidity(
    lineGears: Gear[],
    currentLineParts: PartNumber[],
    previousLineParts: PartNumber[] | null,
    nextLineParts: PartNumber[] | null
  ) {
    const checkedGears = lineGears
      .map((gear) => {
        return this.checkSameLineGearValidity(gear, currentLineParts);
      })
      .map((gear) =>
        this.checkAdjacentLineGearValidity(
          gear,
          previousLineParts,
          nextLineParts
        )
      )
      .map((gear) => {
        if (gear.part1Number && gear.part2Number) {
          return {
            ...gear,
            isValidGear: true,
          };
        }
        return gear;
      });

    return checkedGears;
  }

  processLinesToParts(lines: string[]): Parts {
    const parts: Parts = {};
    lines.forEach((line, i) => (parts[i] = this.parseLineToPartNumbers(line)));
    return parts;
  }

  processLinesToGears(lines: string[]): Gears {
    const gears: Gears = {};
    lines.forEach((line, i) => (gears[i] = this.parseLineToGears(line)));
    return gears;
  }

  checkGearsForValidityAndAddPartValues(
    gears: Gears,
    parts: Parts,
    noOfLines: number
  ): Gear[] {
    return Object.keys(gears).reduce<Gear[]>((acc, lineNo) => {
      const lineNumber = Number(lineNo);
      const lineGears = gears[lineNumber];
      const currentLineParts = parts[lineNumber];
      const previousLineParts = lineNumber === 0 ? null : parts[lineNumber - 1];
      const nextLineParts =
        lineNumber === noOfLines - 1 ? null : parts[lineNumber + 1];

      const checkedLineGears = this.checkLineGearsForValidity(
        lineGears,
        currentLineParts,
        previousLineParts,
        nextLineParts
      );
      return [...acc, ...checkedLineGears];
    }, []);
  }

  solveForPartOne(input: string): string {
    const lines = this.parseInputToLines(input);

    // parse each line for part number
    const parts = this.processLinesToParts(lines);

    const checkedParts = Object.keys(parts).reduce<PartNumber[]>(
      (acc, lineNo) => {
        const lineNumber = Number(lineNo);
        const lineParts = parts[lineNumber];
        const currentLine = lines[lineNumber];
        const previousLine = lineNumber === 0 ? null : lines[lineNumber - 1];
        const nextLine =
          lineNumber === lines.length - 1 ? null : lines[lineNumber + 1];
        const checkedLineParts = this.checkLinePartsForValidity(
          lineParts,
          currentLine,
          previousLine,
          nextLine
        );
        return [...acc, ...checkedLineParts];
      },
      []
    );

    const validParts = checkedParts.filter((p) => p.isValidPart);
    const sumOfPartNumbers = validParts.reduce((acc, p) => {
      return acc + p.value;
    }, 0);

    return sumOfPartNumbers.toString();
  }

  solveForPartTwo(input: string): string {
    const lines = this.parseInputToLines(input);

    // parse each line for parts and gears
    const parts = this.processLinesToParts(lines);
    const gears = this.processLinesToGears(lines);

    const checkedGears = this.checkGearsForValidityAndAddPartValues(
      gears,
      parts,
      lines.length
    );

    const validGears = checkedGears.filter((g) => g.isValidGear);
    console.log(validGears);
    const gearRatios = validGears.map((g) => g.part1Number! * g.part2Number!);
    const sumOfGearRatios = gearRatios.reduce((acc, gr) => acc + gr, 0);

    return sumOfGearRatios.toString();
  }
}

export default new Day3();
