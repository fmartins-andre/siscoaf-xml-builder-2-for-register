import express from "express";
import { registerEndpoints } from "./register.endpoints";
import { dbDataHandler } from "./db-data";

export const registerRouter = express.Router();

registerRouter.get(
  `${registerEndpoints.getProtocol}/:protocol`,
  async (req, res) => {
    try {
      const data = await dbDataHandler(req.params.protocol);

      res.status(200).json(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      res
        .status(error?.message === "Invalid data" ? 400 : 500)
        .json({ message: error?.message || "Erro trying to get data" });
    }
  },
);
