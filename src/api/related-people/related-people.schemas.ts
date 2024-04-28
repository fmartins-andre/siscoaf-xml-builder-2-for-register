import { z } from "zod";

export enum RelatedPersonRelationshipType {
  TITULAR = "1",
  PROCURADOR_REP_LEGAL = "7",
  OUTROS = "8",
  COMPRADOR = "20",
  VENDEDOR = "21",
  BENEFICIARIO_FINAL = "32",
  OUTORGADO = "36",
  OUTORGANTE = "37",
}

export enum RelatedPersonPublicServantType {
  NAO = "0",
  SIM = "1",
  SPF = " 2",
  SPE = "3",
  SPM = "4",
}

function labelValueSchema<T extends z.ZodTypeAny>(type: T) {
  return z.object({
    label: z.string(),
    value: type,
  });
}
export const relatedPeopleTypesSchema = z.object({
  relationshipType: labelValueSchema(
    z.nativeEnum(RelatedPersonRelationshipType),
  ).array(),
  publicServantType: labelValueSchema(
    z.nativeEnum(RelatedPersonPublicServantType),
  ).array(),
});

export type RelatedPeopleTypes = z.infer<typeof relatedPeopleTypesSchema>;
