import { Day } from '../day';

// a better name for this would probably be "gameCubes"
type Reveal = {
  red: number;
  green: number;
  blue: number;
};

type Game = Reveal[];

type ProcessedGames = {
  [key: number]: Game;
};

type PossibleGames = {
  [key: number]: boolean;
};

const REVEAL_INITIAL = {
  red: 0,
  green: 0,
  blue: 0,
} as const;

const colours = ['red', 'green', 'blue'] as const;

class Day2 extends Day {
  constructor() {
    super(2);
  }

  parseGameToReveal(input: string): Reveal {
    return input.split(',').reduce<Reveal>(
      (acc, revealColour) => {
        colours.forEach((c) => {
          if (revealColour.includes(c)) {
            acc[c] = Number(revealColour.replace(c, '').trim());
          }
        });
        return acc;
      },
      { ...REVEAL_INITIAL }
    );
  }

  parseInputToGames(input: string): ProcessedGames {
    const lines = input.split('\n');
    const output = lines.reduce<any>((acc, l) => {
      const [gameTitle, gameText] = l.split(':');
      const gameNo = Number(gameTitle.replace('Game ', '').trim());
      const games = gameText.split(';');
      acc[gameNo] = games.map((g) => this.parseGameToReveal(g));
      return acc;
    }, {});

    return output;
  }

  checkGameValidity(
    games: ProcessedGames,
    providedCubes: Reveal
  ): PossibleGames {
    return Object.keys(games).reduce<PossibleGames>((acc, g) => {
      // check if games valid
      const reveals = games[Number(g)];
      let isValid = true;
      reveals.forEach((r) => {
        colours.forEach((c) => {
          if (r[c] > providedCubes[c]) isValid = false;
        });
      });

      acc[Number(g)] = isValid;
      return acc;
    }, {});
  }

  getCubesNeededForGame(game: Game): Reveal {
    return game.reduce<Reveal>(
      (acc, r) => {
        colours.forEach((c) => {
          if (r[c] > acc[c]) acc[c] = r[c];
        });
        return acc;
      },
      { ...REVEAL_INITIAL }
    );
  }

  solveForPartOne(input: string): string {
    const games = this.parseInputToGames(input);
    const providedCubes: Reveal = {
      red: 12,
      green: 13,
      blue: 14,
    };
    const possibleGames = this.checkGameValidity(games, providedCubes);

    //sum up possible games
    const total = Object.keys(possibleGames).reduce<number>((acc, g) => {
      if (possibleGames[Number(g)] === true) return acc + Number(g);
      return acc;
    }, 0);
    return total.toString();
  }

  solveForPartTwo(input: string): string {
    const games = this.parseInputToGames(input);
    const requiredCubes = Object.values(games).map((g) =>
      this.getCubesNeededForGame(g)
    );
    const powers = requiredCubes.map((r) => {
      // how to do this dynamically
      //   return r.blue * r.green * r.red;
      let power = 1;
      colours.forEach((c) => {
        power = power * r[c];
      });
      return power;
    });
    const sum = powers.reduce((acc, cur) => acc + cur, 0);
    return sum.toString();
  }
}

export default new Day2();
