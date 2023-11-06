import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getAuth } from '@clerk/nextjs/server';
 
interface AuthContext {
  userId: string | null;
}
 
export const createContextInner = async ({ userId }: AuthContext  ) => {
  return {
    userId,
  }
}
 
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  return await createContextInner({ userId: getAuth(opts.req).userId })
}
 
export type Context = trpc.inferAsyncReturnType<typeof createContext>;