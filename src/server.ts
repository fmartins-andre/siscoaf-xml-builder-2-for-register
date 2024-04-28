import express from "express";
import ViteExpress from "vite-express";
import { addressRouter } from "@/api/address/address.server";
import { addressEndpoints } from "@/api/address/address.endpoints";
import { occurrencesRouter } from "@/api/occurrences/occurrences.server";
import { occurrencesEndpoints } from "@/api/occurrences/occurrences.endpoints";
import { relatedPeopleRouter } from "./api/related-people/related-people.server";
import { relatedPeopleEndpoints } from "./api/related-people/related-people.endpoints";

const app = express();

app.use(addressEndpoints.baseUrl, addressRouter);
app.use(occurrencesEndpoints.baseUrl, occurrencesRouter);
app.use(relatedPeopleEndpoints.baseUrl, relatedPeopleRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
