import { Citation } from "@/models/citation";
import { invokeDbActions } from "app/actions";
import { DbAction, createDeleteAction, createSaveScoreAction, createUpdateCitationAction } from "src/server/actions/db-action";
import { SaveChangedScoresRequest } from "src/server/actions/db-update-citation";
import {create} from "zustand";

interface DbActionStore {
    actions: DbAction[];
    createDeleteAction: (citationId: number) => void;
    createSaveScoreAction: (changedRequest: SaveChangedScoresRequest) => void;
    createUpdateCitationAction: (citation: Citation) => void;
    invokeActions: () => Promise<void>;
}

export const useDbActionsStore = create<DbActionStore>((set, get) => ({
    actions: [],
    createDeleteAction: (citationId: number) => {
        set({actions: [...get().actions, createDeleteAction(citationId)]});
    },
    createSaveScoreAction: (changedRequest: SaveChangedScoresRequest) => {
        set({actions: [...get().actions, createSaveScoreAction(changedRequest)]});
    },
    createUpdateCitationAction: (citation: Citation) => {
        set({actions: [...get().actions, createUpdateCitationAction(citation)]});
    },
    invokeActions: async () => {
        await invokeDbActions(get().actions);
        set({actions: []});
    }
}));
