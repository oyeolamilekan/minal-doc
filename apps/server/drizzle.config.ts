import type { Config } from "drizzle-kit"

export default {
  schema: "./src/models/schema/*",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  out: "./src/models/migrations"
} satisfies Config