import { z } from "zod";

const criteriaSchema = z.object({
  refs: z.string().array().min(1),
  descriptions: z.string().array().min(1),
});

export const occurrencesCriteriaSchema = z.object({
  id: z.number().positive(),
  criteria: criteriaSchema.array(),
});

export type OccurrencesCriteria = z.infer<typeof occurrencesCriteriaSchema>;
