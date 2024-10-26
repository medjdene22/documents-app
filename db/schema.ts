import { integer, pgEnum, pgTable, primaryKey, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema} from "drizzle-zod"
import type { AdapterAccountType } from "next-auth/adapters"

export const rolesEnum = pgEnum("roles", ["USER", "ADMIN"])
export const statusEnum = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"])

export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    matricule: text("matricule"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    roles: rolesEnum("role").notNull().default("USER")
   
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.token, t.email),
  })
)

export const PasswordResetToken = pgTable(
  "passwordResetToken",
  {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.token, t.email),
  })
)


export const departments = pgTable("departments", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});
export const insertDepartmentSchima = createInsertSchema(departments);


export const specialties = pgTable("specialties", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  departmentId: text("department-id").references( ()=> departments.id , {
    onDelete: "cascade"
  }).notNull()
});
export const insertSpecialtiesSchima = createInsertSchema(specialties);


export const requests = pgTable("requests", {
  id: text("id").primaryKey(),
  status: statusEnum("status").notNull().default("PENDING"),
  document: text("document").notNull(),
  level: text("level").notNull(),
  note: text("note"),

  userId: text("user_id").references( ()=> users.id , {
    onDelete: "no action"
  }),

  departmentId: text("department-id").references( ()=> departments.id , {
    onDelete: "cascade"
  }).notNull(),

  specialtyId: text("specialty-id").references( ()=> specialties.id , {
    onDelete: "cascade"
  }).notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});
export const insertRequestSchima = createInsertSchema(requests);