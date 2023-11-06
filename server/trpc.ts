import {TRPCError, initTRPC} from "@trpc/server";
import { Context } from "./trpc-context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

export const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
        userId: ctx.userId
    },
  })
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
