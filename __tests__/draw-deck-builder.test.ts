import {WrappedCard, chooseDrawDeck, multiplyCardsByScore} from "../src/utilities/draw-deck-builder";

describe("chooseDrawDeck", () => {
  describe("many cards with no zeroes", () => {
    const sampleDeck = Array.from({length: 100}, (_, i) => ({score: i + 1}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 15", () => {
      expect(drawDeck.length).toEqual(15);
    });

    describe("group 1", () => {
      const group = drawDeck.filter(({card}) => card.score <= 20);
      it("should return 5 cards between 0 and 19", () => {
        expect(group.length).toEqual(5);
      });

      it("should say group 1 for all cards in group", () => {
        expect(group.every(({group}) => group === 1)).toEqual(true);
      });
    });

    describe("group 2", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 20 && card.score <= 40
      );
      it("should return 4 cards between 20 and 39", () => {
        expect(group.length).toEqual(4);
      });

      it("should say group 2 for all cards in group", () => {
        expect(group.every(({group}) => group === 2)).toEqual(true);
      });
    });

    describe("group 3", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 40 && card.score <= 60
      );
      it("should return 3 cards between 40 and 59", () => {
        expect(group.length).toEqual(3);
      });

      it("should say group 3 for all cards in group", () => {
        expect(group.every(({group}) => group === 3)).toEqual(true);
      });
    });

    describe("group 4", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 60 && card.score <= 80
      );
      it("should return 2 cards between 60 and 79", () => {
        expect(group.length).toEqual(2);
      });

      it("should say group 4 for all cards in group", () => {
        expect(group.every(({group}) => group === 4)).toEqual(true);
      });
    });

    describe("group 5", () => {
      const group = drawDeck.filter(({card}) => card.score > 80);
      it("should return 1 card between 80 and 100", () => {
        expect(group.length).toEqual(1);
      });

      it("should say group 5 for all cards in group", () => {
        expect(group.every(({group}) => group === 5)).toEqual(true);
      });
    });
  });

  describe("many cards with some zeroes", () => {
    const sampleDeck = Array.from({length: 100}, (_, i) => ({score: i}));
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 16", () => {
      expect(drawDeck.length).toEqual(16);
    });

    describe("group 0", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      it("should return 1 card of score 0", () => {
        expect(group.length).toEqual(1);
      });
    });
  });

  describe("between 16 and 25 cards and no zeroes", () => {
    const sampleDeck = Array.from({length: 24}, (_, i) => ({score: i + 1}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 10", () => {
      expect(drawDeck.length).toEqual(10);
    });

    describe("group 1", () => {
      const group = drawDeck.filter(({card}) => card.score <= 6);
      it("should return 4 cards between 0 and 6", () => {
        expect(group.length).toEqual(4);
      });

      it("should say group 1 for all cards in group", () => {
        expect(group.every(({group}) => group === 1)).toEqual(true);
      });
    });

    describe("group 2", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 6 && card.score <= 12
      );
      it("should return 3 cards between 7 and 12", () => {
        expect(group.length).toEqual(3);
      });

      it("should say group 2 for all cards in group", () => {
        expect(group.every(({group}) => group === 2)).toEqual(true);
      });
    });

    describe("group 3", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 13 && card.score <= 18
      );
      it("should return 2 cards between 13 and 18", () => {
        expect(group.length).toEqual(2);
      });

      it("should say group 3 for all cards in group", () => {
        expect(group.every(({group}) => group === 3)).toEqual(true);
      });
    });

    describe("group 4", () => {
      const group = drawDeck.filter(({card}) => card.score > 19);
      it("should return 1 card between 19 and 24", () => {
        expect(group.length).toEqual(1);
      });

      it("should say group 4 for all cards in group", () => {
        expect(group.every(({group}) => group === 4)).toEqual(true);
      });
    });
  });

  describe("between 16 and 25 cards with some zeroes", () => {
    const sampleDeck = Array.from({length: 24}, (_, i) => ({score: i}));
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 13", () => {
      expect(drawDeck.length).toEqual(11);
    });

    describe("group 0", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      it("should return 1 cards of score 0", () => {
        expect(group.length).toEqual(1);
      });
    });
  });

  describe("between 9 and 16 cards and no zeroes", () => {
    const sampleDeck = Array.from({length: 15}, (_, i) => ({score: i + 1}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 6", () => {
      expect(drawDeck.length).toEqual(6);
    });

    describe("group 1", () => {
      const group = drawDeck.filter(({card}) => card.score <= 5);
      it("should return 3 cards between 0 and 5", () => {
        expect(group.length).toEqual(3);
      });

      it("should say group 1 for all cards in group", () => {
        expect(group.every(({group}) => group === 1)).toEqual(true);
      });
    });

    describe("group 2", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 5 && card.score <= 10
      );
      it("should return 2 cards between 5 and 10", () => {
        expect(group.length).toEqual(2);
      });

      it("should say group 2 for all cards in group", () => {
        expect(group.every(({group}) => group === 2)).toEqual(true);
      });
    });

    describe("group 3", () => {
      const group = drawDeck.filter(
        ({card}) => card.score > 10 && card.score <= 15
      );
      it("should return 1 cards between 10 and 15", () => {
        expect(group.length).toEqual(1);
      });

      it("should say group 3 for all cards in group", () => {
        expect(group.every(({group}) => group === 3)).toEqual(true);
      });
    });
  });

  describe("between 9 and 16 cards with some zeroes", () => {
    const sampleDeck = Array.from({length: 15}, (_, i) => ({score: i}));
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 9", () => {
      expect(drawDeck.length).toEqual(7);
    });

    describe("group 0", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      it("should return 1 cards of score 0", () => {
        expect(group.length).toEqual(1);
      });
    });
  });

  describe("between 4 and 9 cards and no zeroes", () => {
    const sampleDeck = Array.from({length: 8}, (_, i) => ({score: i + 1}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 3", () => {
      expect(drawDeck.length).toEqual(3);
    });

    describe("group 1", () => {
      const group = drawDeck.filter(({card}) => card.score < 5);
      it("should return 2 cards between 0 and 4", () => {
        expect(group.length).toEqual(2);
      });

      it("should say group 1 for all cards in group", () => {
        expect(group.every(({group}) => group === 1)).toEqual(true);
      });
    });

    describe("group 2", () => {
      const group = drawDeck.filter(
        ({card}) => card.score >= 5 && card.score < 10
      );
      it("should return 1 card between 4 and 8", () => {
        expect(group.length).toEqual(1);
      });

      it("should say group 2 for all cards in group", () => {
        expect(group.every(({group}) => group === 2)).toEqual(true);
      });
    });
  });

  describe("between 4 and 9 cards with some zeroes", () => {
    const sampleDeck = Array.from({length: 8}, (_, i) => ({score: i}));
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    sampleDeck.push({score: 0});
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return a deck of length 6", () => {
      expect(drawDeck.length).toEqual(4);
    });

    describe("group 0", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      it("should return 1 cards of score 0", () => {
        expect(group.length).toEqual(1);
      });
    });
  });

  describe("less than 4 cards and no zeroes", () => {
    const sampleDeck = Array.from({length: 3}, (_, i) => ({score: i + 1}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return all cards", () => {
      expect(drawDeck.length).toEqual(3);
    });
  });

  describe("less than 4 cards and some zeroes", () => {
    const sampleDeck = Array.from({length: 3}, (_, i) => ({score: i}));
    sampleDeck.push({score: 0});
    const drawDeck = chooseDrawDeck(sampleDeck);

    describe("group 0", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      it("should return 1 cards of score 0", () => {
        expect(group.length).toEqual(1);
      });
    });
  });

  describe("deck with only zero-score cards", () => {
    const sampleDeck = Array.from({length: 10}, (_, i) => ({score: 0}));
    const drawDeck = chooseDrawDeck(sampleDeck);

    it("should return 1 cards", () => {
      expect(drawDeck.length).toEqual(1);
    });
  });
});

describe("multiplyCardsByScore", () => {
    const sampleDeck: WrappedCard[] = [
      { card: { score: 0 }, group: 0 },
      { card: { score: 5 }, group: 1 },
      { card: { score: 11 }, group: 2 }
    ];
    const drawDeck = multiplyCardsByScore(sampleDeck);

    it("should multiply score-0 cards by 5", () => {
      const group = drawDeck.filter(({card}) => card.score === 0);
      expect(group.length).toEqual(5);
    });

    it("should multiply score-1 cards by 3", () => {
      const group = drawDeck.filter(({card}) => card.score === 5);
      expect(group.length).toEqual(3);
    });

    it("should multiply score-9 cards by 3", () => {
      const group = drawDeck.filter(({card}) => card.score === 11);
      expect(group.length).toEqual(1);
    });

});
