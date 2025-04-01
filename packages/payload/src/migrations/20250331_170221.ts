import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "news_and_announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"draft" boolean,
  	"pinned" boolean,
  	"thumbnail_id" integer,
  	"contents" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news_and_announcements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_and_announcements_id" integer;
  DO $$ BEGIN
   ALTER TABLE "news_and_announcements" ADD CONSTRAINT "news_and_announcements_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_and_announcements_rels" ADD CONSTRAINT "news_and_announcements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_and_announcements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_and_announcements_rels" ADD CONSTRAINT "news_and_announcements_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "news_and_announcements_title_idx" ON "news_and_announcements" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_thumbnail_idx" ON "news_and_announcements" USING btree ("thumbnail_id");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_updated_at_idx" ON "news_and_announcements" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_created_at_idx" ON "news_and_announcements" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_rels_order_idx" ON "news_and_announcements_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_rels_parent_idx" ON "news_and_announcements_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_rels_path_idx" ON "news_and_announcements_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "news_and_announcements_rels_media_id_idx" ON "news_and_announcements_rels" USING btree ("media_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_and_announcements_fk" FOREIGN KEY ("news_and_announcements_id") REFERENCES "public"."news_and_announcements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_and_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("news_and_announcements_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news_and_announcements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_and_announcements_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "news_and_announcements" CASCADE;
  DROP TABLE "news_and_announcements_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_and_announcements_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_news_and_announcements_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "news_and_announcements_id";`)
}
