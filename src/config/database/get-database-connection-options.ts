import {
  DatabaseConnectionEnv,
  databaseConnectionEnvSchema,
} from "./database-connection-env.schema";

export function getDatabaseConnectionOptions(): DatabaseConnectionEnv {
  const databaseEnv: Record<keyof DatabaseConnectionEnv, unknown> = {
    host: process.env.VITE_DB_HOST,
    port: process.env.VITE_DB_PORT,
    user: process.env.VITE_DB_USER,
    password: process.env.VITE_DB_PASSWORD,
    database: process.env.VITE_DB_DATABASE,
  };

  const result = databaseConnectionEnvSchema.safeParse(databaseEnv);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid database config");
  }

  return result.data;
}
