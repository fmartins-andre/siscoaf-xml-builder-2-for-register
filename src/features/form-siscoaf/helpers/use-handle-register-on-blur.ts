import { useLazyGetProtocol } from "@/api/register/register.client";
import { FocusEventHandler, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import { formDefaultValues } from "../constants";
import { isoStringToDate } from "@/lib/string-methods";
import { toast } from "sonner";
import { inputMask } from "@/lib/input-mask";

type UseHandleRegisterOnBlur = {
  form: UseFormReturn<IFormSiscoaf>;
};

export function useHandleRegisterOnBlur({ form }: UseHandleRegisterOnBlur) {
  const getProtocol = useLazyGetProtocol();

  const getProtocolOnBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const value = e.target.value;

      try {
        const protocolData = await getProtocol(value);

        form.setValue(
          "LOTE.OCORRENCIAS.OCORRENCIA.DtInicio",
          protocolData.DtInicio ? isoStringToDate(protocolData.DtInicio) : null,
        );
        form.setValue(
          "LOTE.OCORRENCIAS.OCORRENCIA.DtFim",
          protocolData.DtFim ? isoStringToDate(protocolData.DtFim) : null,
        );
        form.setValue(
          "LOTE.OCORRENCIAS.OCORRENCIA.VlCred",
          inputMask.currency(protocolData.VlCred ?? "0", "R$"),
        );
        form.setValue(
          "LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO",
          protocolData.ENVOLVIDOS.ENVOLVIDO ??
            formDefaultValues.LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO,
        );

        form.clearErrors();
      } catch (error) {
        toast.warning("Sem informações!", {
          description: "O número informado não retornou dados.",
        });
      }
    },
    [form, getProtocol],
  );

  return getProtocolOnBlur;
}
