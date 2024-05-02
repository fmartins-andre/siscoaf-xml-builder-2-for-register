import { XMLParser } from "fast-xml-parser";
import { ChangeEventHandler } from "react";
import { UseFormReset } from "react-hook-form";
import { IFormSiscoaf, formSiscoafSchema } from "../form-siscoaf.schema";
import { xmlParserOptions } from "./xml-parser-options";

export function useHandleLoadXml(reset: UseFormReset<IFormSiscoaf>) {
  const loadXmlHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = onLoadFile(reset);

    const file = e?.target?.files?.[0];
    if (!file) return;
    reader.readAsText(file);
  };

  return { loadXmlHandler };
}

const parser = new XMLParser(xmlParserOptions);

const onLoadFile =
  (reset: UseFormReset<IFormSiscoaf>) => (e: ProgressEvent<FileReader>) => {
    try {
      const xmlString = e.target?.result;
      if (!xmlString || typeof xmlString !== "string") return;

      const data = parser.parse(xmlString);
      const validateData = formSiscoafSchema.safeParse(data);
      if (!validateData.success) throw new Error("Conteúdo do XML é inválido");

      console.info("data:\n", data);
      reset(data);
    } catch (error) {
      console.error("Erro do conteúdo do XML", error);
    }
  };
