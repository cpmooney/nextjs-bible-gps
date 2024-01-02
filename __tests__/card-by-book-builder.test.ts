import { Citation } from "@/models/citation";
import { buildCardsByBook } from "@/utilities/card-by-book-builder";

describe("buildCardsByBook", () => {
    it("orders the citations", () => {
        const cardsByBook = buildCardsByBook([
            makeCitation("Acts", 5, 7),
            makeCitation("Romans", 5, 7),
            makeCitation("Acts", 7, 2),
            makeCitation("Romans", 7, 2),
            makeCitation("Acts", 5, 1),
            makeCitation("Romans", 5, 1),
        ]);

        expect(cardsByBook.length).toEqual(2);
        expect(cardsByBook[0].book).toEqual("Acts");
        expect(cardsByBook[0].cards.length).toEqual(3);
        expect(cardsByBook[0].cards[0].chapter).toEqual(5);
        expect(cardsByBook[0].cards[0].firstVerse).toEqual(1);
        expect(cardsByBook[0].cards[1].chapter).toEqual(5);
        expect(cardsByBook[0].cards[1].firstVerse).toEqual(7);
        expect(cardsByBook[0].cards[1].chapter).toEqual(7);
        expect(cardsByBook[0].cards[1].firstVerse).toEqual(2);
        expect(cardsByBook[1].book).toEqual("Romans");
        expect(cardsByBook[1].cards.length).toEqual(3);
        expect(cardsByBook[1].cards[0].chapter).toEqual(5);
        expect(cardsByBook[1].cards[0].firstVerse).toEqual(1);
        expect(cardsByBook[1].cards[1].chapter).toEqual(5);
        expect(cardsByBook[1].cards[1].firstVerse).toEqual(7);
        expect(cardsByBook[1].cards[1].chapter).toEqual(7);
        expect(cardsByBook[1].cards[1].firstVerse).toEqual(2);
    });
});

const makeCitation = (book: string, chapter: number, firstVerse: number): Citation => ({
    book,
    chapter,
    firstVerse,
                fragment: "",
                active: true,
                entire: "",
                score: 0,
                suffix: "",
                tags: []
});
