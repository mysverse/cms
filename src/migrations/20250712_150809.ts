import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-07-12T15:08:09.116Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-07-12T15:08:09.116Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-28T10:51:06.065Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-28T10:51:06.065Z';`)
}
