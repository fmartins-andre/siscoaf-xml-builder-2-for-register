import { UF } from "@/api/address/address.schemas";
import {
  RelatedPersonPublicServantType,
  RelatedPersonRelationshipType,
} from "@/api/related-people/related-people.schemas";
import { dateToPtBrIsoString } from "@/lib/date-methods";
import { removeAccents } from "@/lib/string-methods";
import { z } from "zod";

const REQUIRED_MESSAGE = "Obrigatório";

const cpfCnpjSchema = z.string().min(11).max(16);

const envolvidoSchema = z.object({
  TpEnv: z.nativeEnum(RelatedPersonRelationshipType),
  PEP: z.boolean(),
  PObrigada: z.boolean(),
  ServPub: z.nativeEnum(RelatedPersonPublicServantType),
  NmEnv: z.string().min(3).max(150),
  CPFCNPJEnv: cpfCnpjSchema,
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
    .min(2, REQUIRED_MESSAGE)
    .transform((arg) => removeAccents(arg.substring(0, 100)).toUpperCase()),
  AgUF: z.nativeEnum(UF).nullable(),
  VlCred: z.string().refine((arg) => /^\d+([.,]\d+)*$/.test(arg)),
  CPFCNPJCom: cpfCnpjSchema,
  Det: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .max(200)
    .transform((arg) => removeAccents(arg).toUpperCase()),
  ENQUADRAMENTOS: z.object({
    CodEnq: z.number().array().min(1, REQUIRED_MESSAGE),
  }),
  ENVOLVIDOS: z.object({
    ENVOLVIDO: envolvidoSchema.array().min(1, REQUIRED_MESSAGE),
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
        message: REQUIRED_MESSAGE,
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.DtInicio"],
      });
    }

    if (args.LOTE.OCORRENCIAS.OCORRENCIA.DtFim == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: REQUIRED_MESSAGE,
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.DtFim"],
      });
    }

    if (!args.LOTE.OCORRENCIAS.OCORRENCIA.AgUF) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: REQUIRED_MESSAGE,
        path: ["LOTE.OCORRENCIAS.OCORRENCIA.AgUF"],
      });
    }
  });

export type IFormSiscoafRelatedPerson = z.input<typeof envolvidoSchema>;
export type IFormSiscoaf = z.input<typeof formSiscoafSchema>;
export type IFormSiscoafOutput = z.infer<typeof formSiscoafSchema>;
