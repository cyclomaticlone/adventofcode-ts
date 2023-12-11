import day3 from './index';

describe('On Day 3', () => {
  it(`parses line to part numbers`, () => {
    expect(day3.parseLineToPartNumbers('467..114..')).toStrictEqual([
      {
        indexStart: 0,
        indexEnd: 2,
        value: 467,
        isValidPart: false,
      },
      {
        indexStart: 5,
        indexEnd: 7,
        value: 114,
        isValidPart: false,
      },
    ]);

    expect(day3.parseLineToPartNumbers('...*......')).toStrictEqual([]);

    expect(day3.parseLineToPartNumbers('..35..633.')).toStrictEqual([
      {
        indexStart: 2,
        indexEnd: 3,
        value: 35,
        isValidPart: false,
      },
      {
        indexStart: 6,
        indexEnd: 8,
        value: 633,
        isValidPart: false,
      },
    ]);

    expect(day3.parseLineToPartNumbers('.......755')).toStrictEqual([
      {
        indexStart: 7,
        indexEnd: 10,
        value: 755,
        isValidPart: false,
      },
    ]);
  });

  it(`checks valid symbols`, () => {
    expect(day3.isValidSymbol('4')).toEqual(false);
    expect(day3.isValidSymbol('4')).toEqual(false);
    expect(day3.isValidSymbol('+')).toEqual(true);
    expect(day3.isValidSymbol('#')).toEqual(true);
    expect(day3.isValidSymbol('*')).toEqual(true);
    expect(day3.isValidSymbol('')).toEqual(false);
  });

  it(`check same line validity`, () => {
    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '467#..114..'
      )
    ).toEqual(true);

    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '467...114..'
      )
    ).toEqual(false);

    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 2,
          indexEnd: 4,
          value: 467,
          isValidPart: false,
        },
        '..467*.14..'
      )
    ).toEqual(true);

    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 2,
          indexEnd: 4,
          value: 467,
          isValidPart: false,
        },
        '..467.*14..'
      )
    ).toEqual(false);

    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 3,
          indexEnd: 5,
          value: 467,
          isValidPart: false,
        },
        '...467'
      )
    ).toEqual(false);

    expect(
      day3.checkSameLineValidity(
        {
          indexStart: 3,
          indexEnd: 5,
          value: 467,
          isValidPart: false,
        },
        '..*467'
      )
    ).toEqual(true);
  });

  it(`check adjacent line validity`, () => {
    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '#....114..'
      )
    ).toEqual(true);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '.#7...114..'
      )
    ).toEqual(true);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '...*7*.14..'
      )
    ).toEqual(true);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '....*14..'
      )
    ).toEqual(false);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 0,
          indexEnd: 2,
          value: 467,
          isValidPart: false,
        },
        '.32.*14..'
      )
    ).toEqual(false);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 3,
          indexEnd: 5,
          value: 467,
          isValidPart: false,
        },
        '..*...'
      )
    ).toEqual(true);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 3,
          indexEnd: 5,
          value: 467,
          isValidPart: false,
        },
        '....*.'
      )
    ).toEqual(true);

    expect(
      day3.checkAdjacentLineValidity(
        {
          indexStart: 3,
          indexEnd: 5,
          value: 467,
          isValidPart: false,
        },
        '31...*'
      )
    ).toEqual(true);
  });

  it(`parses line to gear numbers`, () => {
    expect(day3.parseLineToGears('467*.114.*')).toStrictEqual([
      {
        index: 3,
        isValidGear: false,
      },
      {
        index: 9,
        isValidGear: false,
      },
    ]);

    expect(day3.parseLineToGears('...*......')).toStrictEqual([
      { index: 3, isValidGear: false },
    ]);

    expect(day3.parseLineToGears('..35.*.633.')).toStrictEqual([
      {
        index: 5,
        isValidGear: false,
      },
    ]);
  });

  it(`check same line part validity`, () => {
    // part before gear
    expect(
      day3.checkSameLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 21,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 21,
      part2Number: undefined,
    });

    // part after gear
    expect(
      day3.checkSameLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 4,
            indexEnd: 7,
            value: 755,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 755,
      part2Number: undefined,
    });

    // part before and after gear
    expect(
      day3.checkSameLineGearValidity(
        {
          index: 5,
          isValidGear: false,
        },
        [
          {
            indexStart: 3,
            indexEnd: 4,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 6,
            indexEnd: 8,
            value: 888,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 5,
      isValidGear: false,
      part1Number: 69,
      part2Number: 888,
    });

    // part not touching gear
    expect(
      day3.checkSameLineGearValidity(
        {
          index: 5,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 3,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 7,
            indexEnd: 8,
            value: 69,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 5,
      isValidGear: false,
      part1Number: undefined,
      part2Number: undefined,
    });
  });

  it(`check adjecent line part validity`, () => {
    // line above, part before gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 21,
            isValidPart: false,
          },
        ],
        null
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 21,
      part2Number: undefined,
    });

    // line above, part above gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 2,
            indexEnd: 4,
            value: 755,
            isValidPart: false,
          },
        ],
        null
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 755,
      part2Number: undefined,
    });

    // line above, part after gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 4,
            indexEnd: 6,
            value: 755,
            isValidPart: false,
          },
        ],
        null
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 755,
      part2Number: undefined,
    });

    // line above, part before and after gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 4,
            indexEnd: 6,
            value: 888,
            isValidPart: false,
          },
        ],
        null
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 69,
      part2Number: 888,
    });

    // line below, part before gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        null,
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 21,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 21,
      part2Number: undefined,
    });

    // line below, part below gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        null,
        [
          {
            indexStart: 2,
            indexEnd: 4,
            value: 755,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 755,
      part2Number: undefined,
    });

    // line below, part after gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        null,
        [
          {
            indexStart: 4,
            indexEnd: 6,
            value: 755,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 755,
      part2Number: undefined,
    });

    // line below, part before and after gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        null,
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 4,
            indexEnd: 6,
            value: 888,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 69,
      part2Number: 888,
    });

    // line above and below
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 3,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 2,
            value: 69,
            isValidPart: false,
          },
        ],
        [
          {
            indexStart: 4,
            indexEnd: 6,
            value: 888,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 3,
      isValidGear: false,
      part1Number: 69,
      part2Number: 888,
    });

    // part not touching gear
    expect(
      day3.checkAdjacentLineGearValidity(
        {
          index: 5,
          isValidGear: false,
        },
        [
          {
            indexStart: 1,
            indexEnd: 3,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 7,
            indexEnd: 8,
            value: 69,
            isValidPart: false,
          },
        ],
        [
          {
            indexStart: 1,
            indexEnd: 3,
            value: 69,
            isValidPart: false,
          },
          {
            indexStart: 7,
            indexEnd: 8,
            value: 69,
            isValidPart: false,
          },
        ]
      )
    ).toEqual({
      index: 5,
      isValidGear: false,
      part1Number: undefined,
      part2Number: undefined,
    });
  });
});
