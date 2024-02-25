import { Citation } from "@/models/citation";
import { invokeDeleteCardAction } from "./db-delete-citation";
import { invokeDbSaveChangedAction } from "./db-save-score";
import { ScoreUpdate, invokeDbUpdateCitationAction } from "./db-update-citation";

const ActionNames = ['delete-citation', 'save-score', 'update-citation'];

type ActionNameType = typeof ActionNames[number];

export interface DbAction {
    actionName: ActionNameType;
    args: unknown;
}

export const invokeAction = async (actionName: ActionNameType,
    userId: string,
    args: unknown) => {
        switch (actionName) {
            case 'delete-citation':
                return await invokeDeleteCardAction(userId, args as number);
            case 'save-score':
                return await invokeDbSaveChangedAction(userId, args as ScoreUpdate);
            case 'update-citation':
                return await invokeDbUpdateCitationAction(userId, args as Citation);
            default:
                throw new Error(`Unknown action name: ${actionName}`);
        }
    }

export const createDeleteAction = (cardId: number): DbAction => {
    return {
        actionName: 'delete-citation',
        args: cardId,
    }
};

export const createSaveScoreAction = (changedRequest: ScoreUpdate): DbAction => {
    return {
        actionName: 'save-score',
        args: changedRequest,
    }
}

export const createUpdateCitationAction = (citation: Citation): DbAction => {
    if (!citation.id) {
        throw "Asynchronous creation is not yet supported -- need to call createNewCitation instead!";
    }
    return {
        actionName: 'update-citation',
        args: citation,
    }
}

