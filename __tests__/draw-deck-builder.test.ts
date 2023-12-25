import { createDrawDeck } from "../src/utilities/draw-deck-builder";

describe("createDrawDeck with no zeroes", () => {
  const sampleDeck = Array.from({ length: 100 }, (_, i) => ({ score: i + 1 }));
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return a deck of length 15", () => {
    expect(drawDeck.length).toEqual(15);
  });

  describe("group 1", () => {
    const group = drawDeck.filter(({ card }) => card.score <= 20);
    it("should return 5 cards between 0 and 19", () => {
      expect(group.length).toEqual(5);
    });

    it ("should say group 1 for all cards", () => {
      expect(group.every(({ group }) => group === 1)).toEqual(true);
    });
  });

  describe("group 2", () => {
    const group = drawDeck.filter(({ card }) => card.score > 20 && card.score <= 40);
    it("should return 4 cards between 20 and 39", () => {
      expect(group.length).toEqual(4);
    });

    it ("should say group 2 for all cards", () => {
      expect(group.every(({ group }) => group === 2)).toEqual(true);
    });
  });

  describe("group 3", () => {
    const group = drawDeck.filter(({ card }) => card.score > 40 && card.score <= 60);
    it("should return 3 cards between 40 and 59", () => {
      expect(group.length).toEqual(3);
    });

    it ("should say group 3 for all cards", () => {
      expect(group.every(({ group }) => group === 3)).toEqual(true);
    });
  });

  describe("group 4", () => {
    const group = drawDeck.filter(({ card }) => card.score > 60 && card.score <= 80);
    it("should return 2 cards between 60 and 79", () => {
      expect(group.length).toEqual(2);
    });

    it ("should say group 4 for all cards", () => {
      expect(group.every(({ group }) => group === 4)).toEqual(true);
    });
  });

  describe("group 5", () => {
    const group = drawDeck.filter(({ card }) => card.score > 80);
    it("should return 1 card between 80 and 100", () => {
      expect(group.length).toEqual(1);
    });

    it ("should say group 5 for all cards", () => {
      expect(group.every(({ group }) => group === 5)).toEqual(true);
    });
  });
});

describe("createDrawDeck with zeroes", () => {
  const sampleDeck = Array.from({ length: 100 }, (_, i) => ({ score: i }))
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  sampleDeck.push({ score: 0 });
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return a deck of length 18", () => {
    expect(drawDeck.length).toEqual(18);
  });

  describe("group 0", () => {
    const group = drawDeck.filter(({ card }) => card.score === 0);
    it("should return 1 card of score 0", () => {
      expect(group.length).toEqual(1);
    });
  });
});

describe("createDrawDeck with few cards", () => {
  const sampleDeck = Array.from({ length: 10 }, (_, i) => ({ score: i }));
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return the entire deck", () => {
    expect(drawDeck.length).toEqual(10);
    sampleDeck.forEach((card, _) => {
      expect(drawDeck).toContainEqual({ card, group: 1 });
    });
  });
});