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
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { removeAccents, removeNonCharOrNum } from "@/lib/string-methods";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export function OcorrenciasEventoSection() {
  const form = useFormContext<IFormSiscoaf>();
  const [filter, setFilter] = useState<string>("");

  const { data: criteria } = useQuery(getCriteria().queryOptions);

  const filteredCriteria = useMemo(() => {
    if (!filter) return criteria;

    const _criteria = criteria?.map((c) => ({
      id: c.id,
      descriptions: removeAccents(
        removeNonCharOrNum(JSON.stringify(c)),
      ).toLowerCase(),
    }));

    const ids = _criteria
      ?.filter((c) =>
        c.descriptions.includes(
          removeAccents(removeNonCharOrNum(filter)).toLowerCase(),
        ),
      )
      .map((c) => c.id);

    return criteria?.filter((c) => ids?.includes(c.id));
  }, [criteria, filter]);

  return (
    <section className="flex flex-col">
      <FormField
        control={form.control}
        name="LOTE.OCORRENCIAS.OCORRENCIA.ENQUADRAMENTOS.CodEnq"
        render={() => (
          <FormItem>
            <div className="mb-4 flex justify-between">
              <FormLabel className="text-base">Enquadramentos</FormLabel>
              <div className="flex gap-1">
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="filtrar enquadramentos"
                  className="w-96"
                />

                <Button
                  variant="outline"
                  size="icon"
                  disabled={!filter}
                  type="button"
                  onClick={() => setFilter("")}
                >
                  <XIcon />
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1">
              {filteredCriteria?.map((item) => (
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
                          field.value?.includes(item.id) &&
                            "border-neutral-400",
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-bold">{item.id}</FormLabel>
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
  );
}
