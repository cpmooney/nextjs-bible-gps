import { Citation } from "@/models/citation";
import { invokeDbActions } from "app/actions";
import { createContext, useContext, useState } from "react";
import { ScoreUpdate } from "src/server/actions/db-update-citation";

interface DbActionContext {
    queueDeleteAction: (cardId: number) => void;
    queueSaveScoreAction: (changedRequest: ScoreUpdate) => void;
    queueUpdateCitationAction: (citation: Citation) => void;
    invokeSaveScoreAction: (changedRequest: ScoreUpdate) => void;
    invokeQueuedActions: () => Promise<void>;
}

export const useDbActionContext = () => {
    const context = useContext(DbActionContext);
    if (!context) {
        throw new Error(
            "useDbActionContext must be used within a DbActionProvider"
        );
    }
    return context;
}

const DbActionContext = createContext<DbActionContext | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DbActionProvider = ({children}: Props) => {
    const [dbActions, setDbActions] = useState<DbAction[]>([]);

    const queueAction = (action: DbAction) => {
        setDbActions((state) => {
            state.push(action);
            return state;
        });
    }

    return (
        <DbActionContext.Provider value={{
            queueDeleteAction: (cardId: number) => 
                queueAction({
                    actionName: 'delete-citation',
                    args: cardId,
                }),
            queueSaveScoreAction: (changedRequest: ScoreUpdate) =>
                queueAction({
                    actionName: 'save-score',
                    args: changedRequest,
                }),
            queueUpdateCitationAction: (citation: Citation) => {
                if (!citation.id) {
                    throw new Error("Asynchronous creation is not yet supported -- need to call createNewCitation instead!");
                }
                queueAction({
                    actionName: 'update-citation',
                    args: citation,
                });
            },
            invokeSaveScoreAction: async (changedRequest: ScoreUpdate) => {
                await invokeDbActions([{
                    actionName: 'save-score',
                    args: changedRequest,
                }]);
            },
            invokeQueuedActions: async () => {
                const actions = dbActions;
                if (actions.length === 0) {
                    return;
                }
                await invokeDbActions(actions);
                setDbActions([]);
            },
        }}>
            {children}
        </DbActionContext.Provider>
    );
}

export const ActionNames = ['delete-citation', 'save-score', 'update-citation'];

export type ActionNameType = typeof ActionNames[number];

export interface DbAction {
    actionName: ActionNameType;
    args: unknown;
}
