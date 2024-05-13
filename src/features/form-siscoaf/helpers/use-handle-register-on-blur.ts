import { useLazyGetProtocol } from "@/api/register/register.client";
import { FocusEventHandler, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import { formDefaultValues } from "../constants";
import { isoStringToDate } from "@/lib/string-methods";

type UseHandleRegisterOnBlur = {
  form: UseFormReturn<IFormSiscoaf>;
};

export function useHandleRegisterOnBlur({ form }: UseHandleRegisterOnBlur) {
  const getProtocol = useLazyGetProtocol();

  const getProtocolOnBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const value = e.target.value;

      const protocolData = await getProtocol(value);

      if (!protocolData) return;

      form.setValue(
        "LOTE.OCORRENCIAS.OCORRENCIA.DtInicio",
        protocolData.DtInicio ? isoStringToDate(protocolData.DtInicio) : null,
      );
      form.setValue(
        "LOTE.OCORRENCIAS.OCORRENCIA.DtFim",
        protocolData.DtFim ? isoStringToDate(protocolData.DtFim) : null,
      );
      form.setValue("LOTE.OCORRENCIAS.OCORRENCIA.VlCred", protocolData.VlCred);
      form.setValue(
        "LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO",
        protocolData.ENVOLVIDOS.ENVOLVIDO ??
          formDefaultValues.LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO,
      );
    },
    [form, getProtocol],
  );

  return getProtocolOnBlur;
}
