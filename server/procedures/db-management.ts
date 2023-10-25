import {ZodDbManagementRequest} from "@/types/interfaces/db-management";
import {executeDbManageAction} from "server/db-management/factory";
import {procedure} from "server/trpc";

export const manageDb = procedure
  .input(ZodDbManagementRequest)
  .mutation(async (request) => {
    return await executeDbManageAction(request.input);
  });
