import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const CitationTable = pgTable("citations", {
  id: serial("id").primaryKey(),
  fragment: text("fragment").notNull(),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  firstVerse: integer("first_verse").notNull(),
  suffix: text("suffix"),
  tags: json("tags").notNull(),
  entire: text("entire"),
  active: boolean("active").notNull().default(false),
});
