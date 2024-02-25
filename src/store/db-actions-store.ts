import { invokeDbActions } from "app/actions";
import { DbAction } from "src/server/actions/db-action";
import {create} from "zustand";
import { immer } from "zustand/middleware/immer";

interface DbActionStore {
    actions: DbAction[];
    queueAction: (action: DbAction) => void;
    invokeActions: () => Promise<void>;
}

export const useDbActionsStore = create(
    immer<DbActionStore>((set, get) => ({
        actions: [],
        queueAction: (action) => {
            set((state) => {
                state.actions.push(action);
            });
        },
        invokeActions: async () => {
            const actions = get().actions;
            if (actions.length === 0) {
                return;
            }
            await invokeDbActions(actions);
            set((state) => {
                state.actions = [];
            });
        }
    }))
);
