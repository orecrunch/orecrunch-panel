import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  url: "file:./database/db.db",
  schema: './database/schema.ts',
  out: './database/migrations'
  
})