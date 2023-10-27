import {
  DbManagementRequest,
  DbManagementResponse,
} from "@/types/interfaces/db-management";
import {DbActionBase} from "server/db-action";
import {DbManageActionSeed} from "../../../utilities/db-seed";
import {DbManageActionDrop} from "./drop";

export const executeDbManageAction = async (
  request: DbManagementRequest
): Promise<DbManagementResponse> => {
  return await createDbManageAction(request).execute();
};

const createDbManageAction = (
  request: DbManagementRequest
): DbActionBase<void> => {
  switch (request.action) {
    case "seed":
      return new DbManageActionSeed(request.module);
    case "drop":
      return new DbManageActionDrop(request.module);
    default:
      throw new Error(`Unknown action ${request.action}`);
  }
};
