import {z} from "zod";

export const ZodCitation = z.object({
  id: z.optional(z.number()),
  userId: z.string(),
  fragment: z.string(),
  book: z.string(),
  chapter: z.number(),
  firstVerse: z.number(),
  suffix: z.string(),
  tags: z.array(z.string()),
  entire: z.string(),
  active: z.boolean(),
  score: z.number(),
});

export type Citation = z.infer<typeof ZodCitation>;
