import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website_info" ADD COLUMN "thumbnail_id" integer;
  DO $$ BEGIN
   ALTER TABLE "website_info" ADD CONSTRAINT "website_info_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "website_info_thumbnail_idx" ON "website_info" USING btree ("thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website_info" DROP CONSTRAINT "website_info_thumbnail_id_media_id_fk";
  
  DROP INDEX IF EXISTS "website_info_thumbnail_idx";
  ALTER TABLE "website_info" DROP COLUMN IF EXISTS "thumbnail_id";`)
}
