CREATE TABLE IF NOT EXISTS "api-projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" text,
	"slug" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api-sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api-endpoints" ADD COLUMN "section_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "api-endpoints" ADD COLUMN "project_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api-endpoints" ADD CONSTRAINT "api-endpoints_section_id_api-sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."api-sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api-endpoints" ADD CONSTRAINT "api-endpoints_project_id_api-projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."api-projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
