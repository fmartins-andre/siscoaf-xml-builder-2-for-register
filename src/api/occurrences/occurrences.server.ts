import express from "express";
import { occurrencesEndpoints } from "./occurrences.endpoints";
import criteria from "@/assets/enquadramentos.json";

export const occurrencesRouter = express.Router();

occurrencesRouter.get(occurrencesEndpoints.getCriteria, async (_, res) => {
  res.status(200).json(criteria);
});
