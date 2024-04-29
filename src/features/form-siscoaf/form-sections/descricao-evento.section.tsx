import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import { formLabels } from "../constants";
import { Textarea } from "@/components/ui/textarea";

import { FormDatePicker } from "../subcomponents/form-date-picker.comp";

import { FormCombobox } from "../subcomponents/form-combobox.comp";
import { useQuery } from "@tanstack/react-query";
import { getCitiesByState, getStates } from "@/api/address/address.client";
import { useMemo } from "react";
import { inputMask } from "@/lib/input-mask";

export function DescricaoEventoSection() {
  const form = useFormContext<IFormSiscoaf>();

  const selectedState = form.watch("LOTE.OCORRENCIAS.OCORRENCIA.AgUF");

  const { data: states } = useQuery(getStates().queryOptions);
  const statesOptions = useMemo(
    () =>
      states?.map((state) => ({ label: state.nome, value: state.sigla })) ?? [],
    [states],
  );

  const { data: cities } = useQuery(
    getCitiesByState(selectedState).queryOptions,
  );
  const citiesOptions = useMemo(
    () => cities?.map((city) => ({ label: city.nome, value: city.nome })) ?? [],
    [cities],
  );

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:gap-2">
      <div className="order-first col-span-full hidden print:block">
        <FormField
          control={form.control}
          name="LOTE.OCORRENCIAS.@ID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formLabels["@ID"]}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="sm:-order-1">
        <FormField
          control={form.control}
          name="LOTE.OCORRENCIAS.OCORRENCIA.NumOcorrencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formLabels.NumOcorrencia}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.DtInicio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.DtInicio}</FormLabel>
            <FormControl>
              <FormDatePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.DtFim"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.DtFim}</FormLabel>
            <FormControl>
              <FormDatePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.AgUF"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.AgUF}</FormLabel>
            <FormControl>
              <FormCombobox
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={statesOptions}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.AgMun"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.AgMun}</FormLabel>
            <FormControl>
              <FormCombobox
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={citiesOptions}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="sm:-order-1 md:order-none">
        <FormField
          control={form.control}
          name="LOTE.OCORRENCIAS.OCORRENCIA.VlCred"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formLabels.VlCred}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(inputMask.currency(e.target.value, "R$"))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.CPFCNPJCom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.CPFCNPJCom}</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) =>
                  field.onChange(inputMask.cpfCnpj(e.target.value))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="col-span-full">
        <FormField
          control={form.control}
          name="LOTE.OCORRENCIAS.OCORRENCIA.Det"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formLabels.Det}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
