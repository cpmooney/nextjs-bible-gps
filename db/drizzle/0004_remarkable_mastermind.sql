CREATE TABLE IF NOT EXISTS "partial_citations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"fragment" text NOT NULL
);
