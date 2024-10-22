import { z } from "zod"
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, primaryKey, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema} from "drizzle-zod"
import type { AdapterAccountType } from "next-auth/adapters"

export const rolesEnum = pgEnum("roles", ["USER", "ADMIN"])

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

export const departmentsRelations = relations(departments, ({ many }) => ({
  specialties: many(specialties),
}));

export const insertDepartmentSchima = createInsertSchema(departments);


export const specialties = pgTable("specialties", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  departmentId: text("department-id").references( ()=> departments.id , {
    onDelete: "cascade"
  }).notNull()
});

export const specialtiesRelations = relations(specialties, ({ one }) => ({
  department: one(departments, {
      fields: [specialties.departmentId],
      references: [departments.id]
  }),

}));

export const insertSpecialtiesSchima = createInsertSchema(specialties);