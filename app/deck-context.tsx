import { Deck } from "@/models/deck";
import { createContext, useContext, useState } from "react";

const DeckContext = createContext<Deck | null>(null);

export const useDeck = () => useContext(DeckContext);

interface DeckProviderProps {
    children: React.ReactNode;
}

export const DeckProvider = ({ children }: DeckProviderProps ) => {
    const [deck, setDeck] = useState<Deck>(Deck.of([]));
    return (
        <DeckContext.Provider value={deck}>
            {children}
        </DeckContext.Provider>
    );
}