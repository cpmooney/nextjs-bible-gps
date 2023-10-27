import { DbSchema } from "@/utilities/obtain-database";
import { DbManageActionSeed } from "@/utilities/seed";
import { z } from "zod";

export const ZodCitation = z.object({
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

export const ZodCitationListPayload = z.object({
  citations: z.array(ZodCitation)
});

export type CitationList = z.infer<typeof ZodCitationListPayload>;

export class CitationSeed extends DbManageActionSeed<CitationList> {
    protected get zodSeedType(): z.AnyZodObject {
        return ZodCitationListPayload;
    }
    protected async sendPayloadToDb(payload: CitationList): Promise<void> {
        await this.insertRows(this.dbSchema.citation, payload.citations);
    }
    protected get zodPayloadType(): z.AnyZodObject {
        throw new Error("Method not implemented.");
    }
    protected get actionName(): string {
        throw new Error("Method not implemented.");
    }
    protected get dbSchema(): DbSchema {
        throw new Error("Method not implemented.");
    }
}