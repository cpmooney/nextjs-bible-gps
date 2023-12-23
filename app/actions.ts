"use server";

import {currentUser} from "@clerk/nextjs";
import {
  SaveChangedScoresRequest,
  invokeDbSaveChangedAction,
} from "src/server/db-save-changed";
import {
  SavePartialCitationRequest,
  invokeDbSavePartialCitationAction,
} from "src/server/db-save-partial-citation";

export const savePartialCards = async (request: SavePartialCitationRequest) => {
  const userId = await guaranteeUserId();
  return await invokeDbSavePartialCitationAction(userId, request);
};

export const saveChangedCards = async (request: SaveChangedScoresRequest) => {
  const userId = await guaranteeUserId();
  return await invokeDbSaveChangedAction(userId, request);
};

export const guaranteeUserId = async (): Promise<string> => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not logged in.");
  }
  return user.id;
};
