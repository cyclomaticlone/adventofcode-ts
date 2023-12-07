import day1 from './index';

describe('On Day 1', () => {
  it(`parse lines into array`, () => {
    expect(day1.parseInput(`line1\nline2\nline3`)).toEqual([
      'line1',
      'line2',
      'line3',
    ]);
  });

  it('gets the first and last digit from a given line - part 1', () => {
    expect(day1.processLine('1abc2')).toEqual(12);
    expect(day1.processLine('pqr3stu8vwx')).toEqual(38);
    expect(day1.processLine('a1b2c3d4e5f')).toEqual(15);
    expect(day1.processLine('treb7uchet')).toEqual(77);
  });

  it('finds the instances of number words in inputs', () => {
    expect(day1.processNumberWordsByOrderInInput('two1nine')).toEqual([
      { index: 0, numberString: 'two' },
      { index: 4, numberString: 'nine' },
    ]);
    expect(day1.processNumberWordsByOrderInInput('eightwothree')).toEqual([
      { index: 0, numberString: 'eight' },
      { index: 4, numberString: 'two' },
      { index: 7, numberString: 'three' },
    ]);
    expect(day1.processNumberWordsByOrderInInput('abcone2threexyz')).toEqual([
      { index: 3, numberString: 'one' },
      { index: 7, numberString: 'three' },
    ]);
    expect(day1.processNumberWordsByOrderInInput('xtwone3four')).toEqual([
      { index: 1, numberString: 'two' },
      { index: 3, numberString: 'one' },
      { index: 7, numberString: 'four' },
    ]);
    expect(day1.processNumberWordsByOrderInInput('4nineeightseven2')).toEqual([
      { index: 1, numberString: 'nine' },
      { index: 5, numberString: 'eight' },
      { index: 10, numberString: 'seven' },
    ]);
    expect(day1.processNumberWordsByOrderInInput('zoneight234')).toEqual([
      { index: 1, numberString: 'one' },
      { index: 3, numberString: 'eight' },
    ]);
  });

  it('converts number words to ones including digits', () => {
    expect(day1.convertNumberWords('two1nine')).toEqual('t2o1n9ne');
    expect(day1.convertNumberWords('eightwothree')).toEqual('e8ght2ot3ree');
    expect(day1.convertNumberWords('abcone2threexyz')).toEqual(
      'abco1e2t3reexyz'
    );
    expect(day1.convertNumberWords('xtwone3four')).toEqual('xt2o1e3f4ur');
    expect(day1.convertNumberWords('4nineeightseven2')).toEqual(
      '4n9nee8ghts7ven2'
    );
    expect(day1.convertNumberWords('zoneight234')).toEqual('zo1e8ght234');
    expect(day1.convertNumberWords('eighthree')).toEqual('e8ght3ree');
    expect(day1.convertNumberWords('sevenine')).toEqual('s7ven9ne');
  });

  it('gets the first and last digit from a given line - part 2', () => {
    function process(input: string): number {
      return day1.processLine(day1.convertNumberWords(input));
    }

    expect(process('two1nine')).toEqual(29);
    expect(process('eightwothree')).toEqual(83);
    expect(process('abcone2threexyz')).toEqual(13);
    expect(process('xtwone3four')).toEqual(24);
    expect(process('4nineeightseven2')).toEqual(42);
    expect(process('zoneight234')).toEqual(14);
    expect(process('7pqrstsixteen')).toEqual(76);
    expect(process('eighthree')).toEqual(83);
    expect(process('sevenine')).toEqual(79);
  });
});
