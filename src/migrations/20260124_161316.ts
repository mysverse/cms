import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2026-01-24T16:13:16.496Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2026-01-24T16:13:16.496Z';
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-07-12T15:08:09.116Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-07-12T15:08:09.116Z';`)
}
