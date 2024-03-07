import {z} from "zod";

export const ZodCitation = z.object({
  id: z.optional(z.number()),
  fragment: z.string(),
  book: z.string(),
  chapter: z.number(),
  firstVerse: z.number(),
  suffix: z.string(),
  tags: z.array(z.string()),
  entire: z.string(),
  active: z.boolean(),
  score: z.number(),
  lastReviewed: z.optional(z.date()),
});

export type Citation = z.infer<typeof ZodCitation>;

export const findCardById = (id: number, cards: Citation[]): Citation | undefined => {
  return cards.find((c) => c.id === id);
};

export const guaranteeCardById = (id: number, cards: Citation[]): Citation => {
  const card = findCardById(id, cards);
  if (!card) {
    throw new Error(`Card with id ${id} not found`);
  }
  return card;
}

export const findCardIndexById = (id: number, cards: Citation[]): number => {
  return cards.findIndex((c) => c.id === id);
}
