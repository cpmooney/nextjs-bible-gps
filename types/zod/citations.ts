import {z} from "zod";

export const ZodCard = z.object({
  id: z.string(),
  fragment: z.string(),
  book: z.string(),
  chapter: z.number(),
  firstVerse: z.number(),
  suffix: z.string(),
  tags: z.array(z.string()),
  entire: z.string(),
  active: z.boolean()
});

export const ZodDeckPayload = z.object({
  cards: z.array(ZodCard)
});

export const ZodDeckResponse = z.object({
  debugMessages: z.array(z.string()),
  payload: ZodDeckPayload,
});

export type DeckPayload = z.infer<typeof ZodDeckPayload>;
