import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2024-11-24T22:20:42.157Z';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2024-11-24T21:32:24.999Z';`)
}
