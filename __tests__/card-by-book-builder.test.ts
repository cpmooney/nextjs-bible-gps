import { Citation } from "@/models/citation";
import { buildCardsByBook } from "@/utilities/card-by-book-builder";

describe("buildCardsByBook", () => {
    describe("organization by book", () => {
        const cardsByBook = buildCardsByBook([
            makeCitation("Acts", 16, 2),
            makeCitation("Romans", 7, 2),
            makeCitation("Acts", 15, 3),
        ]);
        
        it("puts citations with the same book in the same entry", () => {
            expect(cardsByBook[0].book).toEqual("Acts");
            expect(cardsByBook[0].cards.length).toEqual(2);
        });
        
        it("puts citations with different books in different entries", () => {
            expect(cardsByBook[1].book).toEqual("Romans");
            expect(cardsByBook[1].cards.length).toEqual(1);
        });
    });
    
    it("sorts citations by chapter first", () => {
        const cardsByBook = buildCardsByBook([
            makeCitation("Acts", 16, 2),
            makeCitation("Acts", 15, 3),
            makeCitation("Acts", 15, 2)
        ]);
        
        expect(cardsByBook[0].cards[0].chapter).toEqual(15);
        expect(cardsByBook[0].cards[1].chapter).toEqual(15);
        expect(cardsByBook[0].cards[2].chapter).toEqual(16);
    });

    it("sorts citations by verse second", () => {
        const cardsByBook = buildCardsByBook([
            makeCitation("Acts", 16, 2),
            makeCitation("Acts", 15, 3),
            makeCitation("Acts", 15, 2)
        ]);
        
        expect(cardsByBook[0].cards[0].firstVerse).toEqual(2);
        expect(cardsByBook[0].cards[1].firstVerse).toEqual(3);
        expect(cardsByBook[0].cards[2].firstVerse).toEqual(2);
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
