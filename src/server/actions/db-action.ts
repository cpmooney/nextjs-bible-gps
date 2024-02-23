import { Citation, ZodCitation } from "@/models/citation";
import { invokeDeleteCardAction } from "./db-delete-citation";
import { invokeDbSaveChangedAction } from "./db-save-score";
import { SaveChangedScoresRequest, ZodSaveChangedScoresRequest, invokeDbUpdateCitationAction } from "./db-update-citation";
import { z } from "zod";

const ActionNames = ['delete-citation', 'save-score', 'update-citation'];

type ActionNameType = typeof ActionNames[number];

export const invokeAction = (actionName: ActionNameType,
    userId: string,
    args: unknown) => {
        switch (actionName) {
            case 'delete-citation':
                return invokeDeleteCardAction(userId, args as number);
            case 'save-score':
                return invokeDbSaveChangedAction(userId, args as SaveChangedScoresRequest);
            case 'update-citation':
                return invokeDbUpdateCitationAction(userId, args as Citation);
            default:
                throw new Error(`Unknown action name: ${actionName}`);
        }
    }

export const createAction = (actionName: ActionNameType, args: unknown) => {
}

const asNumber = (value: unknown): number => {
    if (typeof value !== 'number') {
        throw new Error(`Expected a number, got ${value}`);
    }
    return value;
}

const isSavedChangedScoresRequest = (value: unknown): value is SaveChangedScoresRequest => {
    return ZodSaveChangedScoresRequest.parse(value);
}

const isCitation = (value: unknown) => {
    return ZodCitation.parse(value);
}

