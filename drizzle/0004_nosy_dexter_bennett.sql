CREATE TABLE IF NOT EXISTS "requests" (
	"id" text PRIMARY KEY NOT NULL,
	"document" text NOT NULL,
	"level" text NOT NULL,
	"user_id" text,
	"department-id" text NOT NULL,
	"specialty-id" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_department-id_departments_id_fk" FOREIGN KEY ("department-id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_specialty-id_specialties_id_fk" FOREIGN KEY ("specialty-id") REFERENCES "public"."specialties"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
