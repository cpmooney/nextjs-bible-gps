import {
  createDrawDeck
} from "../src/utilities/draw-deck-builder";

describe("createDrawDeck", () => {
  const sampleDeck = Array.from({ length: 100 }, (_, i) => ({ score: i }));
  const drawDeck = createDrawDeck(sampleDeck);

  it("should return a deck of length 15", () => {
    expect(drawDeck.length).toEqual(15);
  });

  it("should return 5 cards between 0 and 19", () => {
    expect(drawDeck.filter(card => card.score < 20).length).toEqual(5);
  })

  it("should return 4 cards between 20 and 39", () => {
    expect(drawDeck.filter(card => card.score >= 20 && card.score < 40).length).toEqual(4);
  })

  it("should return 3 cards between 40 and 59", () => {
    expect(drawDeck.filter(card => card.score >= 40 && card.score < 60).length).toEqual(3);
  })

  it("should return 2 cards between 60 and 79", () => {
    expect(drawDeck.filter(card => card.score >= 60 && card.score < 80).length).toEqual(2);
  })

  it("should return 1 card between 80 and 100", () => {
    expect(drawDeck.filter(card => card.score >= 80).length).toEqual(1);
  })
});
