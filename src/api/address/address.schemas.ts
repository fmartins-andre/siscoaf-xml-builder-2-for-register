import { UF } from "@/@types/UF.type";
import { z } from "zod";

export const addressStateSchema = z.object({
  ibge: z.string().length(2),
  nome: z.string().min(1),
  sigla: z.nativeEnum(UF),
});

export type AddressState = z.infer<typeof addressStateSchema>;

export const addressCitySchema = z.object({
  uf: z.nativeEnum(UF),
  nome: z.string().min(1),
  ibge: z.string().length(6),
});

export type AddressCity = z.infer<typeof addressCitySchema>;
