import { Citation } from "@/models/citation";
import { ScoreUpdate } from "src/server/actions/db-update-citation";
import { useDeckDataStore } from "../deck-data-store";
import { useDbActionsStore } from "../db-actions-store";
import { createDeleteAction, createSaveScoreAction, createUpdateCitationAction } from "src/server/actions/db-action";
import { createNewCitation } from "app/actions";

interface DeckDataActions {
  invokeUpdate: (card: Citation) => Promise<void>;
  invokeDelete: (cardId: number) => void;
  updateScore: (args: ScoreUpdate) => void;
}

export const useDeckDataActions = (): DeckDataActions => {
    const deckDataStore = useDeckDataStore();
    const dbActionStore = useDbActionsStore();

    return {
        invokeUpdate: async (card) => {
          if (card.id) {
            deckDataStore.update(card);
            dbActionStore.queueAction(createUpdateCitationAction(card));
          } else {
            card.id = await createNewCitation(card)
            deckDataStore.update(card);
          }
        },
        invokeDelete: (id) => {
          deckDataStore.delete(id);
          dbActionStore.queueAction(createDeleteAction(id));
        },
        updateScore: (args) => {
          deckDataStore.updateScore(args);
          dbActionStore.queueAction(createSaveScoreAction(args));
        },
    }
}