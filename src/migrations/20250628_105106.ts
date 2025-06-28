import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-28T10:51:06.065Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-28T10:51:06.065Z';
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_sessions" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "last_updated" SET DEFAULT '2025-06-21T09:29:08.956Z';
  ALTER TABLE "event_countdown" ALTER COLUMN "event_date" SET DEFAULT '2025-06-21T09:29:08.956Z';`)
}
