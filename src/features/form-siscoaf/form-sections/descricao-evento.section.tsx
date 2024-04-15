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

export function DescricaoEventoSection() {
  const form = useFormContext<IFormSiscoaf>();
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        name="LOTE.OCORRENCIAS.OCORRENCIA.AgMun"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabels.AgMun}</FormLabel>
            <FormControl>
              <Input {...field} />
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
              <Input {...field} />
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
                <Input {...field} />
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
              <Input {...field} />
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
