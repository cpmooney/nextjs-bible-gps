import { createDrawDeck } from "../src/utilities/draw-deck-builder";

describe("createDrawDeck with no zeroes", () => {
  const sampleDeck = Array.from({ length: 100 }, (_, i) => ({ score: i }));
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return a deck of length 15", () => {
    expect(drawDeck.length).toEqual(15);
  });

  describe("group 1", () => {
    const group = drawDeck.filter(({ card }) => card.score < 20);
    it("should return 5 cards between 0 and 19", () => {
      expect(group.length).toEqual(5);
    });
  });

  describe("group 2", () => {
    const group = drawDeck.filter(({ card }) => card.score >= 20 && card.score < 40);
    it("should return 4 cards between 20 and 39", () => {
      expect(group.length).toEqual(4);
    });
  });

  describe("group 3", () => {
    const group = drawDeck.filter(({ card }) => card.score >= 40 && card.score < 60);
    it("should return 3 cards between 40 and 59", () => {
      expect(group.length).toEqual(3);
    });
  });

  describe("group 4", () => {
    const group = drawDeck.filter(({ card }) => card.score >= 60 && card.score < 80);
    it("should return 2 cards between 60 and 79", () => {
      expect(group.length).toEqual(2);
    });
  });

  describe("group 5", () => {
    const group = drawDeck.filter(({ card }) => card.score >= 80);
    it("should return 1 card between 80 and 100", () => {
      expect(group.length).toEqual(1);
    });
  });
});

describe("createDrawDeck with zeroes", () => {
  const sampleDeck = Array.from({ length: 100 }, (_, i) => ({ score: i }))
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return a deck of length 16", () => {
    expect(drawDeck.length).toEqual(16);
  });

  describe("group 0", () => {
    const group = drawDeck.filter(({ card }) => card.score === 0);
    it("should return 1 card of score 0", () => {
      expect(group.length).toEqual(1);
    });
  });
});
