import { z } from "zod";

export enum UF {
  ACRE = "AC",
  ALAGOAS = "AL",
  AMAZONAS = "AM",
  AMAPA = "AP",
  BAHIA = "BA",
  CEARA = "CE",
  DISTRITO_FEDERAL = "DF",
  ESPIRITO_SANTO = "ES",
  GOIAS = "GO",
  MARANHAO = "MA",
  MINAS_GERAIS = "MG",
  MATO_GROSSO_DO_SUL = "MS",
  MATO_GROSSO = "MT",
  PARA = "PA",
  PARAIBA = "PB",
  PERNAMBUCO = "PE",
  PIAUI = "PI",
  PARANA = "PR",
  RIO_DE_JANEIRO = "RJ",
  RIO_GRANDE_DO_NORTE = "RN",
  RONDONIA = "RO",
  RORAIMA = "RR",
  RIO_GRANDE_DO_SUL = "RS",
  SANTA_CATARINA = "SC",
  SERGIPE = "SE",
  SAO_PAULO = "SP",
  TOCANTINS = "TO",
}

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
