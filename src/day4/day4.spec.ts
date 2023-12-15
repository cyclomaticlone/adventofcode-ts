import day4 from './index';

const ALL_CARDS = [
  {
    number: 1,
    cardNumbers: [41, 48, 83, 86, 17],
    winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
    matchingNumbers: [48, 83, 86, 17],
  },
  {
    number: 2,
    cardNumbers: [13, 32, 20, 16, 61],
    winningNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
    matchingNumbers: [32, 61],
  },
  {
    number: 3,
    cardNumbers: [1, 21, 53, 59, 44],
    winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
    matchingNumbers: [1, 21],
  },
  {
    number: 4,
    cardNumbers: [41, 92, 73, 84, 69],
    winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
    matchingNumbers: [84],
  },
  {
    number: 5,
    cardNumbers: [87, 83, 26, 28, 32],
    winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
    matchingNumbers: [],
  },
  {
    number: 6,
    cardNumbers: [31, 18, 13, 56, 72],
    winningNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
    matchingNumbers: [],
  },
];

const LESS_CARDS = [
  {
    number: 3,
    cardNumbers: [1, 21, 53, 59, 44],
    winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
    matchingNumbers: [1, 21],
  },
  {
    number: 4,
    cardNumbers: [41, 92, 73, 84, 69],
    winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
    matchingNumbers: [84],
  },
  {
    number: 5,
    cardNumbers: [87, 83, 26, 28, 32],
    winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
    matchingNumbers: [],
  },
  {
    number: 6,
    cardNumbers: [31, 18, 13, 56, 72],
    winningNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
    matchingNumbers: [],
  },
];

describe('On Day 4', () => {
  it(`parse input line to raw cards`, () => {
    expect(
      day4.parseInputToCards('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toEqual([
      {
        number: 1,
        cardNumbers: [41, 48, 83, 86, 17],
        winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      },
    ]);

    expect(
      day4.parseInputToCards(
        'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
      )
    ).toEqual([
      {
        number: 4,
        cardNumbers: [41, 92, 73, 84, 69],
        winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      },
      {
        number: 5,
        cardNumbers: [87, 83, 26, 28, 32],
        winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      },
    ]);
  });

  it(`calculates card matching numbers`, () => {
    expect(
      day4.checkCardMatchingNumbers({
        number: 1,
        cardNumbers: [41, 48, 83, 86, 17],
        winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      })
    ).toEqual({
      number: 1,
      cardNumbers: [41, 48, 83, 86, 17],
      winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      matchingNumbers: [48, 83, 86, 17],
    });

    expect(
      day4.checkCardMatchingNumbers({
        number: 3,
        cardNumbers: [1, 21, 54, 59, 44],
        winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
      })
    ).toEqual({
      number: 3,
      cardNumbers: [1, 21, 54, 59, 44],
      winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
      matchingNumbers: [1, 21],
    });

    expect(
      day4.checkCardMatchingNumbers({
        number: 4,
        cardNumbers: [41, 92, 73, 84, 69],
        winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      })
    ).toEqual({
      number: 4,
      cardNumbers: [41, 92, 73, 84, 69],
      winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      matchingNumbers: [84],
    });

    expect(
      day4.checkCardMatchingNumbers({
        number: 5,
        cardNumbers: [87, 83, 26, 28, 32],
        winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      })
    ).toEqual({
      number: 5,
      cardNumbers: [87, 83, 26, 28, 32],
      winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      matchingNumbers: [],
    });
  });

  it(`calculates card points`, () => {
    expect(
      day4.calculatePoints({
        number: 1,
        cardNumbers: [41, 48, 83, 86, 17],
        winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
        matchingNumbers: [48, 83, 86, 17],
      })
    ).toEqual({
      number: 1,
      cardNumbers: [41, 48, 83, 86, 17],
      winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      matchingNumbers: [48, 83, 86, 17],
      points: 8,
    });

    expect(
      day4.calculatePoints({
        number: 3,
        cardNumbers: [1, 21, 54, 59, 44],
        winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
        matchingNumbers: [1, 21],
      })
    ).toEqual({
      number: 3,
      cardNumbers: [1, 21, 54, 59, 44],
      winningNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
      matchingNumbers: [1, 21],
      points: 2,
    });

    expect(
      day4.calculatePoints({
        number: 4,
        cardNumbers: [41, 92, 73, 84, 69],
        winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
        matchingNumbers: [84],
      })
    ).toEqual({
      number: 4,
      cardNumbers: [41, 92, 73, 84, 69],
      winningNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      matchingNumbers: [84],
      points: 1,
    });

    expect(
      day4.calculatePoints({
        number: 5,
        cardNumbers: [87, 83, 26, 28, 32],
        winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
        matchingNumbers: [],
      })
    ).toEqual({
      number: 5,
      cardNumbers: [87, 83, 26, 28, 32],
      winningNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      matchingNumbers: [],
      points: 0,
    });
  });

  // it(`calculates card copies`, () => {
  //   expect(
  //     day4.processCopies(
  //       [
  //         {
  //           number: 1,
  //           cardNumbers: [41, 48, 83, 86, 17],
  //           winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
  //           matchingNumbers: [48, 83, 86, 17],
  //         },
  //       ],
  //       ALL_CARDS,
  //       0
  //     )
  //   ).toEqual(15);

  //   expect(day4.processCopies(ALL_CARDS, ALL_CARDS, 0)).toEqual(30);
  // });

  it(`calculates card copies 2`, () => {
    expect(
      day4.calculateCardCopies(
        {
          number: 1,
          cardNumbers: [41, 48, 83, 86, 17],
          winningNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
          matchingNumbers: [48, 83, 86, 17],
        },
        ALL_CARDS
      )
    ).toEqual(15);
  });

  it(`calculates total card copies`, () => {
    expect(
      LESS_CARDS.reduce((count, card) => {
        return count + day4.calculateCardCopies(card, LESS_CARDS);
      }, 0)
    ).toEqual(8);

    expect(
      ALL_CARDS.reduce((count, card, i) => {
        return count + day4.calculateCardCopies(card, ALL_CARDS);
      }, 0)
    ).toEqual(30);
  });
});
