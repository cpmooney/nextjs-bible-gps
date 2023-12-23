import { createDrawDeck } from "./draw-deck-builder";

const max = 200;

const sampleCards = Array.from({ length: max }, (_, i) => ({ score: i })); 
const sampleDeck = createDrawDeck(sampleCards);

export const scoreCounts = () => {
    const counts = Array.from({ length: max }, () => 0);
    sampleDeck.forEach(({ score }) => {
        counts[score]++;
    });
    return counts;
}
