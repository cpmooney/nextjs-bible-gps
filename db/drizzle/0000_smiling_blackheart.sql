CREATE TABLE IF NOT EXISTS "citations" (
	"id" serial PRIMARY KEY NOT NULL,
	"fragment" text NOT NULL,
	"book" text NOT NULL,
	"chapter" integer NOT NULL,
	"first_verse" integer NOT NULL,
	"suffix" text,
	"tags" json NOT NULL,
	"entire" text,
	"active" boolean DEFAULT false NOT NULL
);
