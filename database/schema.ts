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

export const credentials = sqliteTable("credentials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type").notNull(),
  credentialsId: text("creadentialsId").notNull(),
  user_id: text("userId").notNull().references(() => users.id)
})


export const credentialsRelation = relations(credentials, ({one}) => ({
user: one(users, {
fields: [credentials.user_id],
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


export const serverPermissionsRelations = relations(server_permissions, ({one}) => ({
	user: one(users, {
		fields: [server_permissions.user_id],
		references: [users.id]
	}),
	server: one(servers, {
		fields: [server_permissions.server_id],
		references: [servers.id]
	}),
	permission: one(permissions, {
		fields: [server_permissions.permission],
		references: [permissions.id]
	}),
}));

 

 
