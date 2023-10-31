import dotenv from "dotenv";
import type {Config} from "drizzle-kit";

dotenv.config({path: ".env.development.local"});

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL environment variable");
}

export default {
  schema: "./db/schema/*",
  out: "./db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;
