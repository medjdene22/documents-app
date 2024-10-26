import "dotenv/config"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:TPBEJrV0W2lI@ep-icy-lake-a8tspzdr.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
  verbose: true,
  strict: true,
});