import express from "express";
import ViteExpress from "vite-express";
import { addressRouter } from "@/api/address/address.server";
import { addressEndpoints } from "@/api/address/address.endpoints";
import { occurrencesRouter } from "@/api/occurrences/occurrences.server";
import { occurrencesEndpoints } from "@/api/occurrences/occurrences.endpoints";

const app = express();

app.use(addressEndpoints.baseUrl, addressRouter);
app.use(occurrencesEndpoints.baseUrl, occurrencesRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
