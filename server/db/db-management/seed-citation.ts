import {DbManageActionSeed} from "@/utilities/db-seed";
import {DbSchema} from "@/utilities/obtain-database";
import {CitationTable} from "db/schema/citation-table";
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

export class CitationSeed extends DbManageActionSeed<CitationList> {
  protected get zodSeedType(): z.AnyZodObject {
    return ZodCitationList;
  }
  protected async sendPayloadToDb(payload: CitationList): Promise<void> {
    await this.insertRows(this.dbSchema.citation, payload.citations);
  }
  protected get dbSchema(): DbSchema {
    return {CitationTable};
  }
}
