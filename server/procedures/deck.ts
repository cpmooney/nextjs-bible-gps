import {ZodDeckRequest} from "@/types/zod/card-list";
import {DbQueryDeck} from "server/db-query/deck";
import {procedure} from "server/trpc";

export const deck = procedure.input(ZodDeckRequest).query(async (opts) => {
  return await new DbQueryDeck(opts.input.module, opts.input.chapter).execute();
});
