import { z } from "zod";

const envolvidoSchema = z.object({
  TpEnv: z.string(),
  PEP: z.string(),
  PObrigada: z.string(),
  ServPub: z.string(),
  NmEnv: z.string(),
  CPFCNPJEnv: z.string(),
});

const ocorrenciaSchema = z.object({
  NumOcorrencia: z.string(),
  DtInicio: z.string(),
  DtFim: z.string(),
  AgMun: z.string(),
  AgUF: z.string(),
  VlCred: z.string(),
  CPFCNPJCom: z.string(),
  Det: z.string(),
  ENQUADRAMENTOS: z.object({ CodEnq: z.number().array() }),
  ENVOLVIDOS: z.object({
    ENVOLVIDO: envolvidoSchema.array(),
  }),
});

export const formSiscoafSchema = z.object({
  LOTE: z.object({
    OCORRENCIAS: z.object({
      "@ID": z.string(),
      OCORRENCIA: ocorrenciaSchema,
    }),
  }),
});

export type IFormSiscoaf = z.infer<typeof formSiscoafSchema>;
