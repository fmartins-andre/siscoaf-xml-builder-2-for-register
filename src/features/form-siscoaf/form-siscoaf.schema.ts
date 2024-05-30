import { UF } from "@/api/address/address.schemas";
import {
  RelatedPersonPublicServantType,
  RelatedPersonRelationshipType,
} from "@/api/related-people/related-people.schemas";
import { dateToPtBrString } from "@/lib/date-methods";
import { removeAccents } from "@/lib/string-methods";
import { z } from "zod";
import { produce } from "immer";
import { isCNPJ, isCPF } from "validation-br";

const REQUIRED_MESSAGE = "Obrigatório";

const cpfCnpjSchema = z.string().transform((arg, ctx) => {
  const sanitizedValue = arg.replace(/\D/g, "");

  if (!isCNPJ(sanitizedValue) && !isCPF(sanitizedValue)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CPF/CNPJ inválido",
    });
    z.NEVER;
  }

  return sanitizedValue;
});

const envolvidoSchema = z.object({
  TpEnv: z.nativeEnum(RelatedPersonRelationshipType),
  PEP: z.boolean().transform((arg) => (arg ? 1 : 0)),
  PObrigada: z.boolean().transform((arg) => (arg ? 1 : 0)),
  ServPub: z.nativeEnum(RelatedPersonPublicServantType),
  NmEnv: z
    .string()
    .min(3)
    .max(150)
    .transform((arg) => removeAccents(arg).toUpperCase()),
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
    .transform((date) => (date === null ? date : dateToPtBrString(date))),
  DtFim: z
    .date()
    .nullable()
    .transform((date) => (date === null ? date : dateToPtBrString(date))),
  AgMun: z
    .string()
    .min(2, REQUIRED_MESSAGE)
    .transform((arg) => removeAccents(arg.substring(0, 100)).toUpperCase()),
  AgUF: z.nativeEnum(UF).nullable(),
  VlCred: z.string().transform((arg, ctx) => {
    const decimalRegex = /^\d+([.,]\d+)*$/;
    const sanitizedValue = arg.replace(/[^\d.,]/g, "");
    const numericValue = Number(
      sanitizedValue.replace(".", "").replace(",", "."),
    );

    switch (true) {
      case !sanitizedValue:
      case !decimalRegex.test(sanitizedValue): {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Valor inválido",
        });
        return z.NEVER;
      }

      case numericValue < 1: {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          inclusive: true,
          minimum: 1,
          type: "number",
        });
        return z.NEVER;
      }

      default:
        return sanitizedValue;
    }
  }),
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
  })
  .transform((args) =>
    produce((draft) => {
      draft.LOTE.OCORRENCIAS["@ID"] =
        args.LOTE.OCORRENCIAS.OCORRENCIA.NumOcorrencia;
    }, args),
  );

export type IFormSiscoafRelatedPerson = z.input<typeof envolvidoSchema>;
export type IFormSiscoaf = z.input<typeof formSiscoafSchema>;
export type IFormSiscoafOutput = z.infer<typeof formSiscoafSchema>;
