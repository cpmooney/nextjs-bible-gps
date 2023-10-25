import {chapterList} from "server/procedures/chapter-list";
import {manageDb} from "server/procedures/db-management";
import {deck} from "server/procedures/deck";
import {router} from "../trpc";

export const appRouter = router({manageDb, deck, chapterList});

// export type definition of API
export type AppRouter = typeof appRouter;
