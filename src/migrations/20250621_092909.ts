import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "event_id" SET DATA TYPE varchar;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-21T09:29:08.956Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-21T09:29:08.956Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "event_id" SET DATA TYPE numeric;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-21T09:08:56.582Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-21T09:08:56.582Z';`)
}
