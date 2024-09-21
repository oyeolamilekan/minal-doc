import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import drizzleConfig from '../../drizzle.config';
import postgres from 'postgres';

async function main() {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 });

  // This will run migrations on the database, skipping the ones already applied
  await migrate(drizzle(connection), { migrationsFolder: drizzleConfig.out });

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}

main();