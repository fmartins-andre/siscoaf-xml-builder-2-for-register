import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import { XMLBuilder } from "fast-xml-parser";
import { formDefaultValues } from "../constants";
import { toast } from "sonner";

type UseHandleSubmit = {
  form: UseFormReturn<IFormSiscoaf>;
};

export function useHandleSubmit({ form }: UseHandleSubmit) {
  const onValid: SubmitHandler<IFormSiscoaf> = (data) => {
    const builder = new XMLBuilder({
      format: true,
      ignoreAttributes: false,
      attributeNamePrefix: "@",
    });

    const xmlContent = builder.build(data);
    console.info("xml:\n", xmlContent);

    const xmlFile = new Blob([xmlContent], { type: "text/plain" });
    const downloadUrl = window.URL.createObjectURL(xmlFile);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${data.LOTE.OCORRENCIAS["@ID"]}.xml`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);

    form.reset(formDefaultValues);
    toast.success("XML gerado com sucesso!");
  };

  const onInvalid: SubmitErrorHandler<IFormSiscoaf> = (error) => {
    console.error(error);
    toast.error("Oops... Corrija os problemas do formulário");
  };

  const onSubmitHandler = form.handleSubmit(onValid, onInvalid);

  return { onSubmitHandler };
}
