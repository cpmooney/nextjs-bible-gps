import { invokeDbActions } from "app/actions";
import { DbAction } from "src/server/actions/db-action";
import {create} from "zustand";

interface DbActionStore {
    actions: DbAction[];
    queueAction: (action: DbAction) => void;
    invokeActions: () => Promise<void>;
}

export const useDbActionsStore = create(
    ((set, get: () => DbActionStore) => ({
        actions: [],
        queueAction: (action) => {
            set((state) => {
                state.actions.push(action);
                return state;
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
                return state;
            });
        }
    }))
);
