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

export function DescricaoEventoSection() {
  const form = useFormContext<IFormSiscoaf>();
  return (
    <section>
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
    </section>
  );
}
