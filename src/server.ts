import express from "express";
import ViteExpress from "vite-express";
import { addressRouter } from "@/api/address/address.server";
import { addressEndpoints } from "./api/address/address.endpoints";

const app = express();

app.use(addressEndpoints.baseUrl, addressRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
