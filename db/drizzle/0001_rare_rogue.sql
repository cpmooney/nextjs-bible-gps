ALTER TABLE "citations" ALTER COLUMN "suffix" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "citations" ALTER COLUMN "entire" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "citations" ADD COLUMN "user_id" text NOT NULL;