import { inputMask } from "@/lib/input-mask";
import { dateBrToIso } from "@/lib/string-methods";
import { X2jOptions } from "fast-xml-parser";

export const xmlParserOptions: X2jOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  isArray: (tagName) => {
    switch (tagName) {
      case "ENVOLVIDO":
      case "CodEnq":
        return true;

      default:
        return false;
    }
  },
  tagValueProcessor: (tagName, tagValue) => {
    switch (tagName) {
      case "CodEnq":
        return Number(tagValue);

      case "PEP":
      case "PObrigada":
        return Boolean(Number(tagValue));

      case "DtInicio":
      case "DtFim":
        return new Date(dateBrToIso(tagValue) + "T12:00:00.000Z");

      case "CPFCNPJEnv":
      case "CPFCNPJCom":
        return inputMask.cpfCnpj(tagValue);

      default:
        return undefined;
    }
  },
};
