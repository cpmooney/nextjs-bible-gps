import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { CitationTable } from "./citation-table";

export const ScoreTable = pgTable("scores", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  citationId: integer("citation_id").notNull()
    .references(() => CitationTable.id),
  promptType: text("prompt_type").notNull()
});