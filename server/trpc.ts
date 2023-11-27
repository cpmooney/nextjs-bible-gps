import {TRPCError, initTRPC} from "@trpc/server";
import {Context} from "./trpc-context";
import { usingUser } from "@/utilities/current-auth";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

export const isAuthed = t.middleware(({next, ctx}) => {
  const userId = ctx?.auth?.userId;
  if (!userId) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }
  usingUser(userId);
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
