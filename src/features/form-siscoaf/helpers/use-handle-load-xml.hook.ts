import { XMLParser } from "fast-xml-parser";
import { ChangeEventHandler } from "react";
import { UseFormReset, UseFormReturn } from "react-hook-form";
import { IFormSiscoaf, formSiscoafSchema } from "../form-siscoaf.schema";
import { xmlParserOptions } from "./xml-parser-options";
import { toast } from "sonner";
import { produce } from "immer";
import { inputMask } from "@/lib/input-mask";

type UseHandleLoadXml = {
  form: UseFormReturn<IFormSiscoaf>;
};

export function useHandleLoadXml({ form }: UseHandleLoadXml) {
  const loadXmlHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = onLoadFile(form.reset);

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

      const getValidData = produce((draft) => {
        // garante formatação do VlrCred
        const VlrCred = (data as IFormSiscoaf).LOTE.OCORRENCIAS.OCORRENCIA
          .VlCred;

        draft.LOTE.OCORRENCIAS.OCORRENCIA.VlCred = inputMask.currency(
          Number(VlrCred) || VlrCred,
          "R$",
        );
      }, data as IFormSiscoaf);

      reset(getValidData());

      toast.success("XML importado com sucesso!");
    } catch (error) {
      console.error("Erro do conteúdo do XML", error);
      toast.error("Erro ao ler o XML", {
        description: "Não foi possível recuperar as informações do arquivo.",
      });
    }
  };
