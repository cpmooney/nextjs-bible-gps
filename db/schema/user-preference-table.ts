import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const UserPreferenceTable = pgTable("user_preferences", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    promptDisplay: text("prompt_display").notNull(),
    advancedView: boolean("advanced_view").notNull(),
    manualSave: boolean("manual_save").notNull(),
});