import { z } from "zod";

export const ZodDeckResponse = z.object({
  debugMessages: z.array(z.string()),
  payload: ZodCitationListPayload,
});