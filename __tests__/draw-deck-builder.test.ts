import {
  computeScoreCutoffs,
  createDrawDeck,
  numberOfTimesForScore
} from "src/utilities/draw-deck-builder";

describe("numberOfTimesForScore", () => {
  it("returns 5 for a score of 0", () => {
    expect(numberOfTimesForScore(0)).toEqual(5);
  });

  it("returns 4 for a score of 1", () => {
    expect(numberOfTimesForScore(0)).toEqual(4);
  });

  it("returns 4 for a score of 10", () => {
    expect(numberOfTimesForScore(10)).toEqual(4);
  });

  it("returns 3 for a score of 11", () => {
    expect(numberOfTimesForScore(11)).toEqual(3);
  });

  it("returns 3 for a score of 20", () => {
    expect(numberOfTimesForScore(20)).toEqual(3);
  });

  it("returns 2 for a score of 21", () => {
    expect(numberOfTimesForScore(21)).toEqual(2);
  });

  it("returns 2 for a score of 30", () => {
    expect(numberOfTimesForScore(30)).toEqual(2);
  });

  it("returns 1 for a score of 31", () => {
    expect(numberOfTimesForScore(31)).toEqual(1);
  });

  it("returns 1 for a score of 99", () => {
    expect(numberOfTimesForScore(99)).toEqual(1);
  });
});

describe("computeScoreCutoffs", () => {
  const scores = [27, 33, 4, 14, 18, 10, 23, 0, 7, 37, 2, 17, 0];

  it("returns intro as the 10th percentile", () => {
    expect(computeScoreCutoffs(scores).intro).toEqual(0);
  });

  it("returns intermediate as the 50th percentile", () => {
    expect(computeScoreCutoffs(scores).intermediate).toEqual(14);
  });
});

describe("createDrawDeck", () => {
  const cards = Array.from({ length: 100 }, (_, i) => ({ score: i }));
  const drawDeck = createDrawDeck(cards);

  it("returns a draw deck with 50 cards", () => {
    expect(drawDeck.length).toEqual(50);
  });

  describe("zero score cards", () => {
    const zeroCards = drawDeck.filter(({ score }) => score === 0);

    it("contains 5 cards", () => {
      expect(zeroCards.length).toEqual(5);
    });

    it("contains 1 unique card", () => {
      expect(new Set(zeroCards).size).toEqual(1);
    });
  });

  describe("intro cards", () => {
    const introCards = drawDeck.filter(({ score }) => score > 0 && score <= 10);

    it("contains 30 cards", () => {
      expect(introCards.length).toEqual(30);
    });

    it("contains 10 unique cards", () => {
      expect(new Set(introCards).size).toEqual(10);
    });
  });

  describe("intermediate cards", () => {
    const intermediateCards = drawDeck.filter(({ score }) => score > 10 && score <= 50);

    it("contains 10 cards", () => {
      expect(intermediateCards.length).toEqual(10);
    });

    it("contains 10 unique cards", () => {
      expect(new Set(intermediateCards).size).toEqual(10);
    });
  });

  describe("advanced cards", () => {
    const advancedCards = drawDeck.filter(({ score }) => score > 50);

    it("contains 5 cards", () => {
      expect(advancedCards.length).toEqual(5);
    });

    it("contains 5 unique cards", () => {
      expect(new Set(advancedCards).size).toEqual(5);
    });
  });
});

