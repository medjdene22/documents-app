CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
ALTER TABLE "requests" ADD COLUMN "status" "status" DEFAULT 'PENDING' NOT NULL;