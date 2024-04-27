import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";
import React from "react";

export type FormDatePickerProps = Partial<CalendarProps> & {
  value: Date | null;
  onChange?: SelectSingleEventHandler;
};

export const FormDatePicker = React.forwardRef<
  HTMLButtonElement,
  FormDatePickerProps
>(({ value, onChange, ...rest }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild ref={ref}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value ? format(value, "P") : <span>Selecione uma data</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...rest}
          mode="single"
          selected={value ?? undefined}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          captionLayout="dropdown-buttons"
          fromYear={1900}
          toYear={new Date().getFullYear()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});
