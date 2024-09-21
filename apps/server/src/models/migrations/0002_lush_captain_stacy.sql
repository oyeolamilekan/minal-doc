ALTER TABLE "api-sections" ADD COLUMN "project_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api-sections" ADD CONSTRAINT "api-sections_project_id_api-projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."api-projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
