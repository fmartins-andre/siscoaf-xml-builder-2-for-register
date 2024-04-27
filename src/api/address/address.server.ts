import express from "express";
import states from "@/assets/estados.json";
import cities from "@/assets/municipios.json";
import { addressEndpoints } from "./address.endpoints";

export const addressRouter = express.Router();

addressRouter.get(addressEndpoints.getStates, async (_, res) => {
  res.status(200).json(states);
});

addressRouter.get(
  `${addressEndpoints.getCitiesByState}/:state`,
  async (req, res) => {
    const citiesByState = cities.filter(
      (city) => city.uf?.toLowerCase() === req.params.state.toLowerCase(),
    );

    if (!citiesByState.length) {
      res.status(400).json({ message: "Given state is invalid" });
    } else {
      res.status(200).json(citiesByState);
    }
  },
);
