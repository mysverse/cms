import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "news__order_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-21T05:32:13.500Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-21T05:32:13.500Z';
  ALTER TABLE "news" DROP COLUMN "_order";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-05-26T04:40:58.165Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-05-26T04:40:58.165Z';
  ALTER TABLE "news" ADD COLUMN "_order" varchar;
  CREATE INDEX "news__order_idx" ON "news" USING btree ("_order");`)
}
