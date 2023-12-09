import day2 from './index';

describe('On Day 2', () => {
  it(`parse input to games`, () => {
    expect(
      day2.parseInputToGames(
        'Game 1: 1 red, 10 blue, 5 green; 11 blue, 6 green; 6 green; 1 green, 1 red, 12 blue; 3 blue; 3 blue, 4 green, 1 red\nGame 2: 3 red, 5 green; 5 green, 7 red; 1 blue, 7 red, 3 green; 3 red, 2 blue; 5 green, 4 red'
      )
    ).toEqual({
      '1': [
        {
          blue: 10,
          green: 5,
          red: 1,
        },
        {
          blue: 11,
          green: 6,
          red: 0,
        },
        {
          blue: 0,
          green: 6,
          red: 0,
        },
        {
          blue: 12,
          green: 1,
          red: 1,
        },
        {
          blue: 3,
          green: 0,
          red: 0,
        },
        {
          blue: 3,
          green: 4,
          red: 1,
        },
      ],
      '2': [
        {
          blue: 0,
          green: 5,
          red: 3,
        },
        {
          blue: 0,
          green: 5,
          red: 7,
        },
        {
          blue: 1,
          green: 3,
          red: 7,
        },
        {
          blue: 2,
          green: 0,
          red: 3,
        },
        {
          blue: 0,
          green: 5,
          red: 4,
        },
      ],
    });
  });

  it(`parse game into reveal`, () => {
    expect(day2.parseGameToReveal('1 red, 10 blue, 5 green')).toEqual({
      blue: 10,
      green: 5,
      red: 1,
    });

    expect(day2.parseGameToReveal('1 blue, 7 red, 3 green')).toEqual({
      blue: 1,
      green: 3,
      red: 7,
    });

    expect(day2.parseGameToReveal(' 11 blue, 6 green')).toEqual({
      blue: 11,
      green: 6,
      red: 0,
    });

    expect(day2.parseGameToReveal(' 3 blue')).toEqual({
      blue: 3,
      green: 0,
      red: 0,
    });
  });

  it(`computes game validity`, () => {
    expect(
      day2.checkGameValidity(
        {
          '1': [
            {
              blue: 10,
              green: 5,
              red: 1,
            },
            {
              blue: 11,
              green: 6,
              red: 0,
            },
            {
              blue: 0,
              green: 6,
              red: 0,
            },
            {
              blue: 12,
              green: 1,
              red: 1,
            },
          ],
          '2': [
            {
              blue: 0,
              green: 5,
              red: 3,
            },
            {
              blue: 0,
              green: 5,
              red: 7,
            },
            {
              blue: 1,
              green: 3,
              red: 7,
            },
          ],
        },
        {
          red: 8,
          green: 5,
          blue: 3,
        }
      )
    ).toEqual({
      1: false,
      2: true,
    });
  });

  it('gets minimum cubes needed for games', () => {
    expect(
      day2.getCubesNeededForGame([
        {
          blue: 10,
          green: 5,
          red: 1,
        },
        {
          blue: 11,
          green: 6,
          red: 0,
        },
        {
          blue: 0,
          green: 6,
          red: 0,
        },
        {
          blue: 12,
          green: 1,
          red: 1,
        },
      ])
    ).toEqual({
      blue: 12,
      green: 6,
      red: 1,
    });
  });
});
