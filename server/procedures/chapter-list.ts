import {ZodChapterListPayload} from "@/types/interfaces/chapter-list";
import {DbQueryActionChapterList} from "server/db-query/chapter-list";
import {procedure} from "server/trpc";

export const chapterList = procedure
  .input(ZodChapterListPayload)
  .query(async (opts) => {
    return await new DbQueryActionChapterList(opts.input.module).execute();
  });
