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
    try {
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
    } catch (error) {
      console.info("form data:\n", data);
      console.error("on submit error:\n", error);

      toast.error("Oops... Houve um erro inesperado ", {
        description:
          "Por favor informe este problema ao administrador do sistema. Código: ERR001",
      });
    }
  };

  const onInvalid: SubmitErrorHandler<IFormSiscoaf> = (error) => {
    console.error("form errors:\n", error);
    toast.error("Oops... Corrija os problemas do formulário");
  };

  const onSubmitHandler = form.handleSubmit(onValid, onInvalid);

  return { onSubmitHandler };
}
