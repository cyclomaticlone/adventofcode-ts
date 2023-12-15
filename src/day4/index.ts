import { Day } from '../day';

type RawCard = {
  number: number;
  cardNumbers: number[];
  winningNumbers: number[];
};

type ProcessedCard = RawCard & {
  matchingNumbers: number[];
};

type ProcessedCardWithPoints = ProcessedCard & {
  points: number;
};

type ProcessedCardWithCopies = RawCard & {
  copies: number[];
};

class Day4 extends Day {
  constructor() {
    super(4);
  }

  parseInputToCards(input: string): RawCard[] {
    const lines = input.split('\n');
    const output = lines.reduce<RawCard[]>((acc, l) => {
      const [cardText, numbersText] = l.split(':');
      const cardNumber = Number(cardText.replace('Card ', '').trim());
      const [cardNumbersText, winningNumbersText] = numbersText.split('|');
      const cardNumbers = cardNumbersText
        .trim()
        .split(' ')
        .filter((v) => Boolean(v))
        .map((n) => Number(n));
      const winningNumbers = winningNumbersText
        .trim()
        .split(' ')
        .filter((v) => Boolean(v))
        .map((n) => Number(n));
      const card = {
        number: cardNumber,
        cardNumbers,
        winningNumbers,
      };
      return [...acc, card];
    }, []);

    return output;
  }

  checkCardMatchingNumbers(card: RawCard): ProcessedCard {
    const matchingNumbers = card.cardNumbers.reduce<number[]>((acc, n) => {
      if (card.winningNumbers.includes(n)) {
        return [...acc, n];
      }
      return acc;
    }, []);

    return {
      ...card,
      matchingNumbers,
    };
  }

  calculatePoints(card: ProcessedCard): ProcessedCardWithPoints {
    const points =
      card.matchingNumbers.length > 0
        ? Math.pow(2, card.matchingNumbers.length - 1)
        : 0;

    return {
      ...card,
      points,
    };
  }

  getCard(cardNo: number, allCards: ProcessedCard[]): ProcessedCard {
    return allCards.find((allCardCard) => allCardCard.number === cardNo)!;
  }

  processCopies(
    cards: ProcessedCard[],
    allCards: ProcessedCard[],
    cardCount: number
  ): number {
    // no matches so no more cards spawned
    if (cards.length === 1 && cards[0].matchingNumbers.length === 0)
      return cardCount + 1;

    const firstCard = cards.shift()!;
    cardCount++;

    const numberOfCopies = firstCard.matchingNumbers.length;
    const startingNumber = firstCard.number + 1;
    const copyIds = Array.from(
      { length: numberOfCopies },
      (v, i) => startingNumber + i
    );
    const newCards = copyIds.map((id) => this.getCard(id, allCards));
    return this.processCopies([...cards, ...newCards], allCards, cardCount);

    // cards.forEach((c) => {
    //   const numberOfCopies = c.matchingNumbers.length;
    //   if (numberOfCopies === 0) return;
    //   const startingNumber = c.number + 1;
    //   const copyIds = Array.from(
    //     { length: numberOfCopies },
    //     (v, i) => startingNumber + i
    //   );
    //   const newCards = copyIds.map((id) => this.getCard(id, allCards));
    // });
  }

  calculateCardCopies(card: ProcessedCard, allCards: ProcessedCard[]): number {
    // console.log(card.number, card.matchingNumbers.length);
    // base case, if no more cards
    if (card.matchingNumbers.length === 0) return 1;

    // find cards that were won
    const startingNumber = card.number + 1;
    const copyIds = Array.from(
      { length: card.matchingNumbers.length },
      (v, i) => startingNumber + i
    );
    const newCards = copyIds.map((id) => this.getCard(id, allCards));
    const value = newCards.reduce((acc, card) => {
      return this.calculateCardCopies(card, allCards) + acc;
    }, 0);
    // console.log('returning for card', card.number, { value });
    return value + 1; // + 1 to account for the initial card
  }

  solveForPartOne(input: string): string {
    const rawCards = this.parseInputToCards(input);
    const processedCards = rawCards
      .map((c) => this.checkCardMatchingNumbers(c))
      .map((c) => this.calculatePoints(c));

    const total = processedCards.reduce((acc, card) => acc + card.points, 0);
    return total.toString();
  }

  solveForPartTwo(input: string): string {
    console.time('p2');
    const rawCards = this.parseInputToCards(input);
    const processedCards = rawCards.map((c) =>
      this.checkCardMatchingNumbers(c)
    );

    const totalCardCount = processedCards.reduce((count, card, i) => {
      return count + this.calculateCardCopies(card, processedCards);
    }, 0);
    console.timeEnd('p2');

    return totalCardCount.toString();
  }
}

export default new Day4();
