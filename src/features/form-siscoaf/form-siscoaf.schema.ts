import { UF } from "@/api/address/address.schemas";
import { dateToPtBrIsoString } from "@/lib/date-methods";
import { removeAccents } from "@/lib/string-methods";
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
  NumOcorrencia: z
    .string()
    .min(4)
    .max(80)
    .transform((arg) => removeAccents(arg).toUpperCase()),
  DtInicio: z
    .date()
    .nullable()
    .transform((date) => (date === null ? date : dateToPtBrIsoString(date))),
  DtFim: z
    .date()
    .nullable()
    .transform((date) => (date === null ? date : dateToPtBrIsoString(date))),
  AgMun: z
    .string()
    .min(2)
    .transform((arg) => removeAccents(arg.substring(0, 100)).toUpperCase()),
  AgUF: z.nativeEnum(UF).nullable(),
  VlCred: z.string().refine((arg) => /^\d+([.,]\d+)*$/.test(arg)),
  CPFCNPJCom: z.string().min(11).max(16),
  Det: z
    .string()
    .max(200)
    .transform((arg) => removeAccents(arg).toUpperCase()),
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
