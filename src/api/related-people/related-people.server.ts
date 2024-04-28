import express from "express";
import { relatedPeopleEndpoints } from "./related-people.endpoints";
import tipoRelacao from "@/assets/tipo-relacao.json";
import tipoServidorPublico from "@/assets/tipo-servidor-publico.json";

export const relatedPeopleRouter = express.Router();

relatedPeopleRouter.get(relatedPeopleEndpoints.getTypes, async (_, res) => {
  if (!tipoRelacao.length || !tipoServidorPublico) {
    res.status(404).json({ message: "Data not found" });
  } else {
    res.status(200).json({
      relationshipType: tipoRelacao,
      publicServantType: tipoServidorPublico,
    });
  }
});
