import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "website_info_contact_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone_number" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "website_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero" jsonb,
  	"email" varchar,
  	"address" varchar,
  	"facebook" varchar,
  	"instagram" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "website_info_contact_numbers" ADD CONSTRAINT "website_info_contact_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_info"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "website_info_contact_numbers_order_idx" ON "website_info_contact_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "website_info_contact_numbers_parent_id_idx" ON "website_info_contact_numbers" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "website_info_contact_numbers" CASCADE;
  DROP TABLE "website_info" CASCADE;`)
}
