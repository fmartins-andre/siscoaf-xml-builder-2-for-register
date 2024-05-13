import { z } from "zod";

export const databaseConnectionEnvSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().positive(),
  user: z.string().min(1),
  password: z.string().min(1),
  database: z.string().min(1),
});

export type DatabaseConnectionEnv = z.output<
  typeof databaseConnectionEnvSchema
>;
