import type { WebAuthnCredential } from "#auth-utils";
import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text, primaryKey,  } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  hashPassword: text("password").notNull(),
  image: text("image").notNull(),
})

export const credentials = sqliteTable(
  'credentials',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    id: text('id').notNull().unique().$defaultFn(() => crypto.randomUUID()),
    publicKey: text('publicKey').notNull(),
    counter: integer('counter'),
    backedUp: integer('backedUp', {
      mode:"boolean"
    }),
    transports: text('transports', { mode: 'json' }).$type<WebAuthnCredential['transports']>(),
    type: text("type").notNull(),
    
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.id] }),
  })
);

export const credentialsRelation = relations(credentials, ({one}) => ({
  user: one(users, {
  fields: [credentials.userId],
  references: [users.id]
  })
  }))


export const servers = sqliteTable("servers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), 
  created_at: text('timestamp')
  .notNull()
  .default(sql`(current_timestamp)`),
})
export const permissions = sqliteTable("permissions", {
  id: text("id")
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  permission: text("permission").notNull().unique(), 
})

export const server_permissions = sqliteTable("server_permissions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  permission: text("permission_id").notNull().references(() => permissions.id),
  server_id:  text("server_id").notNull().references(() => servers.id),
  user_id: text("user_id").notNull().references(() => users.id)
})



 

 
