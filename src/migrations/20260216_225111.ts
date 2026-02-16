import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2026-02-16T22:51:11.171Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2026-02-16T22:51:11.171Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2026-01-24T16:13:16.496Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2026-01-24T16:13:16.496Z';`)
}
