import mysql from "mysql2/promise";
import { getDatabaseConnectionOptions } from "./get-database-connection-options";

export async function getDatabaseConnection(): Promise<mysql.Connection> {
  const connectionConfig = getDatabaseConnectionOptions();

  if (!connectionConfig) throw new Error("No database config");

  const connection = await mysql.createConnection(connectionConfig);
  return connection;
}
