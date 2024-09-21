CREATE TABLE IF NOT EXISTS "api-endpoints" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(250) NOT NULL,
	"name" varchar(250) NOT NULL,
	"body" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
