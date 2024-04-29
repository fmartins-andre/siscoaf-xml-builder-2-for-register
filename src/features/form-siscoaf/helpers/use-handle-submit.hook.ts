import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import { XMLBuilder } from "fast-xml-parser";

export function useHandleSubmit(
  handleSubmit: UseFormHandleSubmit<IFormSiscoaf>,
) {
  const onValid: SubmitHandler<IFormSiscoaf> = (data) => {
    console.log(data);

    const builder = new XMLBuilder({
      format: true,
      ignoreAttributes: false,
      attributeNamePrefix: "@",
    });

    const xmlContent = builder.build(data);
    const xmlFile = new Blob([xmlContent], { type: "text/plain" });
    const downloadUrl = window.URL.createObjectURL(xmlFile);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${data.LOTE.OCORRENCIAS["@ID"]}.xml`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);

    console.log("xmlContent: ", xmlContent);
  };

  const onInvalid: SubmitErrorHandler<IFormSiscoaf> = (error) => {
    console.error(error);
  };

  const onSubmitHandler = handleSubmit(onValid, onInvalid);

  return { onSubmitHandler };
}
