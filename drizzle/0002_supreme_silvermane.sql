ALTER TABLE "passwordResetToken" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN IF EXISTS "name";