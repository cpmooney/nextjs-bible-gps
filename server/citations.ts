import {z} from "zod";

export const ZodCitation = z.object({
  id: z.string(),
  fragment: z.string(),
  book: z.string(),
  chapter: z.number(),
  firstVerse: z.number(),
  suffix: z.string(),
  tags: z.array(z.string()),
  entire: z.string(),
  active: z.boolean(),
});

export const ZodCitationList = z.object({
  citations: z.array(ZodCitation),
});

export type CitationList = z.infer<typeof ZodCitationList>;
