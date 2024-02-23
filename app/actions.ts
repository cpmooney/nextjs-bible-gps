"use server";

import {Citation} from "@/models/citation";
import { deserialize } from "@/utilities/serialize";
import {currentUser} from "@clerk/nextjs";
import {User} from "@clerk/nextjs/server";
import { demoUser } from "src/constants";
import { invokeDbDuplicateDemoCards } from "src/server/db-duplicate-demo-cards";
import {invokeDbImportAllAction} from "src/server/db-import-all-rows";
import {invokeDbLoadAllPartialCitationAction} from "src/server/db-load-all-partial-citations";
import {invokeDbLoadCitationAction} from "src/server/db-load-citation";
import {invokeDbUpdateCitationAction} from "src/server/actions/db-update-citation";

export const duplicateDemoCards = async () => {
  const userId = await guaranteeUserId({useDemo: true});
  await invokeDbDuplicateDemoCards(userId);
}

export const importAllCards = async (tsv: string) => {
  // TODO: This needs to be wired up further down.
  const userId = await guaranteeUserId({useDemo: true});
  const allCitations = deserialize(tsv);
  await invokeDbImportAllAction(userId, allCitations);
};

export const loadPartialCitations = async () => {
  const userId = await guaranteeUserId({});
  return await invokeDbLoadAllPartialCitationAction(userId);
};

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
