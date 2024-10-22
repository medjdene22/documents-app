CREATE TABLE IF NOT EXISTS "specialties" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"department-id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "specialties" ADD CONSTRAINT "specialties_department-id_departments_id_fk" FOREIGN KEY ("department-id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
