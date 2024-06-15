import { useFormContext } from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCriteria } from "@/api/occurrences/occurrences.client";
import { groupToArray } from "@/lib/group-to-array";

export function OcorrenciasEventoSection() {
  const form = useFormContext<IFormSiscoaf>();

  const { data } = useQuery(getCriteria().queryOptions);

  const criteriaGroups = data?.length ? groupToArray(data, "group") : [];

  return (
    <section className="flex flex-col gap-8">
      {criteriaGroups.map((criteria, index) => (
        <section className="flex flex-col flex-wrap gap-4" key={index}>
          <div className="flex flex-wrap justify-between">
            <span className="text-xl">{criteria[0].group}</span>
          </div>

          <FormField
            control={form.control}
            name="LOTE.OCORRENCIAS.OCORRENCIA.ENQUADRAMENTOS.CodEnq"
            render={() => (
              <FormItem>
                <div className="flex w-full flex-col gap-1">
                  {criteria?.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="LOTE.OCORRENCIAS.OCORRENCIA.ENQUADRAMENTOS.CodEnq"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className={cn(
                              "w-full rounded-sm border border-neutral-200 p-2 hover:border-neutral-400",
                              "flex flex-row space-x-4 space-y-0",
                              field.value?.includes(item.id)
                                ? "border-neutral-400 print:border-transparent print:hover:border-transparent"
                                : "print:hidden",
                            )}
                          >
                            <div className="flex flex-col gap-2">
                              <FormControl>
                                <Checkbox
                                  className="print:hidden"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-bold print:pt-2">
                                {item.id}
                              </FormLabel>
                            </div>
                            <div className="p-0">
                              {item.criteria.map((crit, index) => (
                                <FormLabel key={`${item.id}-${index}`}>
                                  {crit.refs.join(" | ")}
                                  <FormDescription className="font-normal">
                                    {crit.descriptions.join(" ")}
                                  </FormDescription>
                                </FormLabel>
                              ))}
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      ))}
    </section>
  );
}
