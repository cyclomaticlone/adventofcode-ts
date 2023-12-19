import { Day } from '../day';

type SeedProcessed = {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

type Thing = keyof SeedProcessed;

export type Map = {
  sourceStart: number;
  destinationStart: number;
  rangeLength: number;
};

type AllMaps = {
  'seed-to-soil': Map[];
  'soil-to-fertilizer': Map[];
  'fertilizer-to-water': Map[];
  'water-to-light': Map[];
  'light-to-temperature': Map[];
  'temperature-to-humidity': Map[];
  'humidity-to-location': Map[];
};

type MapName = `${Thing}-to-${Thing}`;

const MAPPING_ORDER = [
  'seed',
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity',
  'location',
] as const;

class Day5 extends Day {
  constructor() {
    super(5);
  }

  parseLineToMap(line: string): Map {
    const parts = line.split(' ').map((p) => Number(p));
    return {
      destinationStart: parts[0],
      sourceStart: parts[1],
      rangeLength: parts[2],
    };
  }

  parseLinesToMaps(input: string[]): AllMaps {
    const allMaps: AllMaps = {
      'seed-to-soil': [],
      'soil-to-fertilizer': [],
      'fertilizer-to-water': [],
      'water-to-light': [],
      'light-to-temperature': [],
      'temperature-to-humidity': [],
      'humidity-to-location': [],
    };

    // refactor to parse maps
    const mapIndices = input.reduce<number[]>((acc, line, i) => {
      if (line.includes('map:')) {
        return [...acc, i];
      }
      return acc;
    }, []);

    mapIndices.forEach((startIndex, i) => {
      const mapName = input[startIndex].replace('map:', '').trim();

      // if last one, use last line, otherwise its 2 lines before the next map title line (they are separated by newline)
      const endIndex =
        i === mapIndices.length - 1 ? input.length - 1 : mapIndices[i + 1] - 2;

      const maps = [];
      // start from the line after the title
      for (i = startIndex + 1; i <= endIndex; i++) {
        maps.push(this.parseLineToMap(input[i]));
      }
      allMaps[mapName as keyof AllMaps] = maps;
    });

    return allMaps;
  }

  processSeed(seedNumber: number, maps: AllMaps) {
    const processedSeed: any = {
      seed: seedNumber,
    };
    MAPPING_ORDER.forEach((fromCategory, i) => {
      if (fromCategory === 'location') return;

      const toCategory = MAPPING_ORDER[i + 1];
      const mapName = `${fromCategory}-to-${toCategory}`;

      const value = this.getDestinationValue(
        processedSeed[fromCategory],
        maps[mapName as keyof AllMaps]
      );

      processedSeed[toCategory] = value;
    });

    return processedSeed;
  }

  getDestinationValue(sourceValue: number, maps: Map[]) {
    const validMap = maps.find(
      (m) =>
        sourceValue >= m.sourceStart &&
        sourceValue <= m.sourceStart + (m.rangeLength - 1)
    );

    return validMap
      ? validMap.destinationStart + (sourceValue - validMap.sourceStart)
      : sourceValue;
  }

  parseInputPart1(input: string) {
    const lines = input.split('\n');
    const seedLine = lines.find((l) => l.includes('seeds'));
    const seeds = seedLine!.split(' ').filter((item) => item !== 'seeds:');
    const maps = this.parseLinesToMaps(lines);

    return {
      seeds,
      maps,
    };
  }

  parseInputPart2(input: string) {
    const lines = input.split('\n');
    const seedLine = lines.find((l) => l.includes('seeds'));
    const seedRanges = this.parseSeedRangesFromLine(seedLine!);
    const maps = this.parseLinesToMaps(lines);

    return {
      seedRanges,
      maps,
    };
  }

  parseSeedRangesFromLine(line: string) {
    const numbers = line!.split(' ').filter((item) => item !== 'seeds:');

    type SeedRange = {
      starting: number;
      length: number;
    };

    const seedRanges = numbers.reduce<SeedRange[]>((acc, cur, i) => {
      let newSeedRange;
      // even index are new ranges
      if (i % 2 == 0) {
        newSeedRange = {
          starting: Number(cur),
          length: 0,
        };
        return [...acc, newSeedRange];
      }

      newSeedRange = acc.at(-1);
      if (newSeedRange) {
        newSeedRange!.length = Number(cur);
      }
      return acc;
    }, []);

    return seedRanges;
  }

  solveForPartOne(input: string): string {
    const { seeds, maps } = this.parseInputPart1(input);

    // loop through seeds and follow through to the end
    const processedSeeds = seeds.map((seedNo) =>
      this.processSeed(Number(seedNo), maps)
    );

    const sortedByLocation = processedSeeds.sort((a, b) =>
      a.location > b.location ? 1 : -1
    );

    return sortedByLocation[0].location.toString();
  }

  async getLowestLocationSeedInRange(seedRange: SeedRange, maps: AllMaps) {}

  solveForPartTwo(input: string): string {
    const { seedRanges, maps } = this.parseInputPart2(input);

    // const seeds = seedRanges.reduce<Number[]>((acc, cur) => {
    //   console.log(cur);
    //   const newSeeds = Array.from({ length: cur.length }).map(
    //     (_, i) => cur.starting + i
    //   );
    //   console.log(newSeeds);
    //   return [];
    // }, []);

    // return '';

    console.time('p');

    // maybe can parallelise for speed

    const lowestLocationSeedsPerSeedRange = seedRanges.map((seedRange) => {
      // process the first one
      let lowestSeed = this.processSeed(seedRange.starting, maps);

      console.log('processing seed range:', seedRange);

      for (let i = 1; i < seedRange.length; i++) {
        const newSeed = this.processSeed(seedRange.starting + i, maps);
        // if the new seed has a lower location, replace lowestSeed
        if (newSeed.location < lowestSeed.location) {
          lowestSeed = newSeed;
        }
      }

      console.log({ lowestSeed });

      return lowestSeed;
    });

    const sortedByLocation = lowestLocationSeedsPerSeedRange.sort((a, b) =>
      a.location > b.location ? 1 : -1
    );

    console.log(sortedByLocation[0]);

    console.timeEnd('p');

    // return sortedByLocation[0].location.toString();

    return '';
  }
}

export default new Day5();
