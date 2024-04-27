import { UF } from "@/@types/UF.type";
import { dateToPtBrIsoString } from "@/lib/date-methods";
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
  DtInicio: z
    .date()
    .nullable()
    .transform((date) => (date === null ? date : dateToPtBrIsoString(date))),
  DtFim: z
    .date()
    .nullable()
    .transform((date) => (date === null ? date : dateToPtBrIsoString(date))),
  AgMun: z.string(),
  AgUF: z.nativeEnum(UF).nullable(),
  VlCred: z.string(),
  CPFCNPJCom: z.string(),
  Det: z.string(),
  ENQUADRAMENTOS: z.object({ CodEnq: z.number().array() }),
  ENVOLVIDOS: z.object({
    ENVOLVIDO: envolvidoSchema.array(),
  }),
});

export const formSiscoafSchema = z
  .object({
    LOTE: z.object({
      OCORRENCIAS: z.object({
        "@ID": z.string(),
        OCORRENCIA: ocorrenciaSchema,
      }),
    }),
  })
  .superRefine((args, ctx) => {
    if (args.LOTE.OCORRENCIAS.OCORRENCIA.DtInicio == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: "Obrigatório",
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.DtInicio"],
      });
    }

    if (args.LOTE.OCORRENCIAS.OCORRENCIA.DtFim == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: "Obrigatório",
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.DtFim"],
      });
    }

    if (!args.LOTE.OCORRENCIAS.OCORRENCIA.AgUF) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Obrigatório",
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.AgUF"],
      });
    }
  });

export type IFormSiscoaf = z.input<typeof formSiscoafSchema>;
export type IFormSiscoafOutput = z.infer<typeof formSiscoafSchema>;
