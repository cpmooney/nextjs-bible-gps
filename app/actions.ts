"use server";

import {Citation} from "@/models/citation";
import {currentUser} from "@clerk/nextjs";
import {User} from "@clerk/nextjs/server";
import { demoUser } from "src/constants";
import { invokeDbDuplicateDemoCards } from "src/server/db-duplicate-demo-cards";
import {invokeDbLoadCitationAction} from "src/server/db-load-citation";
import {ScoreUpdate, invokeDbUpdateCitationAction} from "src/server/actions/db-update-citation";
import { ActionNameType, DbAction } from "./components/providers/db-actions-provider";
import { invokeDbSaveChangedAction } from "src/server/actions/db-save-score";
import { invokeDeleteCardAction } from "src/server/actions/db-delete-citation";

export const invokeDbActions = async (actions: DbAction[]) => {
  const userId = await guaranteeUserId({});
  await Promise.all(
    actions.map(({ actionName, args }) => invokeAction(actionName, userId, args))
  );
}
const invokeAction = async (actionName: ActionNameType,
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

export const createNewCitation = async (citation: Citation): Promise<number> => {
    if (citation.id) {
        throw new Error('Do not call createNewCitation for a citation which is already in the db');
    }
  const userId = await guaranteeUserId({});
  return invokeDbUpdateCitationAction(userId, citation);
}

export const duplicateDemoCards = async () => {
  const userId = await guaranteeUserId({useDemo: true});
  await invokeDbDuplicateDemoCards(userId);
}

export const saveCitation = async (citation: Citation): Promise<number> => {
  const userId = await guaranteeUserId({});
  return await invokeDbUpdateCitationAction(userId, citation);
};

export const loadCitation = async (citationId: number): Promise<Citation> => {
  const userId = await guaranteeUserId({});
  return await invokeDbLoadCitationAction(userId, citationId);
};

export const guaranteeUserId = async ({
  useDemo,
}: {
  useDemo?: boolean;
}): Promise<string> => {
  const user = await currentUser();
  if (!user) {
    return utilizeDemoUserIfDirected(useDemo ?? false);
  }
  return resolveAdminToDemo(user);
};

const utilizeDemoUserIfDirected = (useDemo: boolean) => {
  if (useDemo) {
    return demoUser;
  }
  throw new Error("No user logged in");
};

const resolveAdminToDemo = (user: User) => {
  if (user.privateMetadata?.admin) {
    console.log("!! Admin !!");
    return demoUser;
  }
  return user.id;
};

const guranteeAdminOnly = async () => {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.admin ?? false;
  if (!isAdmin) {
    throw new Error("Admin only");
  }
};
