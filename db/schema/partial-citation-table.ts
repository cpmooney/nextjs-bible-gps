import { pgTable, serial, text  } from "drizzle-orm/pg-core";

export const PartialCitationTable = pgTable("partial_citations", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    fragment: text("fragment").notNull(),
});