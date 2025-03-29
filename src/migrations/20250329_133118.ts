import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "event_countdown" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_name" varchar DEFAULT 'Event',
  	"event_date" timestamp(3) with time zone DEFAULT '2025-03-29T13:31:18.652Z',
  	"background_image_id" integer,
  	"event_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-03-29T13:31:18.652Z';
  DO $$ BEGIN
   ALTER TABLE "event_countdown" ADD CONSTRAINT "event_countdown_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event_countdown" ADD CONSTRAINT "event_countdown_event_image_id_media_id_fk" FOREIGN KEY ("event_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "event_countdown_background_image_idx" ON "event_countdown" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "event_countdown_event_image_idx" ON "event_countdown" USING btree ("event_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_countdown" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "event_countdown" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2024-12-13T18:08:16.904Z';`)
}
