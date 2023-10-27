import { ZodCitation, ZodCitationListPayload } from "@/types/zod/citations";
import { DbSchema } from "@/utilities/obtain-database";
import { DbManageActionSeed } from "@/utilities/seed";
import { ZodAny } from "zod";

export class CitationSeed extends DbManageActionSeed {
    protected get getZodPayloadType(): ZodAny {
        return ZodCitationListPayload;
    }
    protected parseJsonPayload(body: any) {
        throw new Error("Method not implemented.");
    }
    protected sendPayloadToDb(payload: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected get actionName(): string {
        throw new Error("Method not implemented.");
    }
    protected get dbSchema(): DbSchema {
        throw new Error("Method not implemented.");
    }

}