"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { removeAccents, removeNonCharOrNum } from "@/lib/string-methods";

export type FormComboboxProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  options: Array<{ value: string; label: string }>;
};

export function FormCombobox({ value, onChange, options }: FormComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);

  function filterOptions(value: string, search: string): number {
    const _value = removeAccents(
      removeNonCharOrNum(
        JSON.stringify(
          options.find(
            (opt) => opt.label.includes(value) || opt.value.includes(value),
          ),
        ) || value,
      ),
    );
    const term = removeAccents(removeNonCharOrNum(search));

    const valueHasTerm = term
      .split(" ")
      .map((word) => _value.toUpperCase().includes(word.toUpperCase()))
      .every(Boolean);

    return valueHasTerm ? 1 : 0;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            "print:m-0 print:h-fit print:border-transparent print:p-0",
          )}
        >
          {value
            ? options?.find((option) => option?.value === value)?.label
            : "Selecione"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 print:opacity-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command filter={filterOptions}>
          <CommandInput placeholder="Digite para filtrar" />
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options?.map((option) => (
                <CommandItem
                  value={option.value}
                  key={option.value}
                  onSelect={(value) => {
                    onChange(value);
                    setOpen((prev) => !prev);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
