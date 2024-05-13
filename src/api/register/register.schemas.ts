// import { UF } from "@/api/address/address.schemas";
import {
  RelatedPersonPublicServantType,
  RelatedPersonRelationshipType,
} from "@/api/related-people/related-people.schemas";
import { inputMask } from "@/lib/input-mask";
import { isoStringToDate, removeAccents } from "@/lib/string-methods";
import { z } from "zod";

const envolvidoSchema = z.object({
  TpEnv: z
    .nativeEnum(RelatedPersonRelationshipType)
    .default(RelatedPersonRelationshipType.TITULAR),
  PEP: z.coerce.boolean(),
  PObrigada: z.coerce.boolean(),
  ServPub: z
    .string()
    .nullish()
    .transform((arg) => {
      switch (arg?.toUpperCase()) {
        case "SIM":
          return RelatedPersonPublicServantType.SIM;

        case "SPE":
          return RelatedPersonPublicServantType.SPE;

        case "SPF":
          return RelatedPersonPublicServantType.SPF;

        case "SPM":
          return RelatedPersonPublicServantType.SPM;

        default:
          return RelatedPersonPublicServantType.NAO;
      }
    }),
  NmEnv: z
    .string()
    .transform((arg) => removeAccents(arg).toUpperCase())
    .default(""),
  CPFCNPJEnv: z
    .string()
    .default("")
    .transform((arg) => inputMask.cpfCnpj(arg)),
});

export const registerDataSchema = z
  .object({
    DtInicio: z
      .string()
      .nullable()
      .transform((dateStr) => (dateStr ? isoStringToDate(dateStr) : null)),
    DtFim: z
      .string()
      .nullable()
      .transform((dateStr) => (dateStr ? isoStringToDate(dateStr) : null)),
    // AgMun: z
    //   .string()
    //   .nullish()
    //   .transform((arg) =>
    //     arg ? removeAccents(arg.substring(0, 100)).toUpperCase() : undefined,
    //   ),
    // AgUF: z.nativeEnum(UF).nullish(),
    VlCred: z.coerce
      .string()
      .default("0")
      .transform((arg) => {
        const sanitizedValue = parseFloat(arg).toFixed(2).replace(".", ",");
        const formattedValue = inputMask.currency(sanitizedValue, "R$");

        return formattedValue;
      }),
    ENVOLVIDOS: z.object({
      ENVOLVIDO: envolvidoSchema.array().nullable(),
    }),
  })
  .superRefine((args, ctx) => {
    const hasNoData = Object.values(args).every((value) => !value);

    if (hasNoData) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "NO_DATA",
      });
    }
  });

export type RegisterData = z.output<typeof registerDataSchema>;
export type RegisterDataInput = z.input<typeof registerDataSchema>;
