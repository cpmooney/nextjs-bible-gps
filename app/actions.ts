"use server";

import {auth} from "@clerk/nextjs";
import {
  SaveChangedScoresRequest,
  invokeDbSaveChangedAction,
} from "src/server/db-save-changed";
import {
  SavePartialCitationRequest,
  invokeDbSavePartialCitationAction,
} from "src/server/db-save-partial-citation";

export const savePartialCards = async (request: SavePartialCitationRequest) => {
  const userId = guaranteeUserId();
  return await invokeDbSavePartialCitationAction(userId, request);
};

export const saveChangedCards = async (request: SaveChangedScoresRequest) => {
  const userId = guaranteeUserId();
  return await invokeDbSaveChangedAction(userId, request);
};

export const guaranteeUserId = () => {
  const {userId} = auth();
  if (!userId) {
    throw new Error("User not found");
  }
  return userId;
};
