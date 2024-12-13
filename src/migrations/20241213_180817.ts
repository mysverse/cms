import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2024-12-13T18:08:16.904Z';
  ALTER TABLE "news" ADD COLUMN "place_id" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2024-12-09T14:07:19.373Z';
  ALTER TABLE "news" DROP COLUMN IF EXISTS "place_id";`)
}
