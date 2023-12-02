import { Citation } from "@/models/citation";
import { createContext, useContext, useState } from "react";

enum Status {
    PreLoad,
    Loading,
    Loaded,
    Built,
    Error
}

export interface DeckContext {
    nextCard: () => Citation;
    initialScore: () => number;
    totalScore: () => number;
    status: () => Status;
}

const DeckContext = createContext<DeckContext | null>(null);

export const useDeckContext = () => useContext(DeckContext);

interface DeckProviderProps {
    children: React.ReactNode;
}

export const DeckProvider = ({ children }: DeckProviderProps ) => {
    const [allCards, setAllCards] = useState<Citation[]>([]);
    const [deckIsBuilt, setDeckIsBuilt] = useState(false);

    const deckContext: DeckContext = {
        nextCard: (): Citation => {
        },
        initialScore: (): number => {
        },
        totalScore: (): number => {
        },
        status: (): Status => {
        },
    };

    return (
        <DeckContext.Provider value={deckContext}>
            {children}
        </DeckContext.Provider>
    );
}