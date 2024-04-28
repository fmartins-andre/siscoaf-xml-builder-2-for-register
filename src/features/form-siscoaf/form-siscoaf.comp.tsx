import { useForm } from "react-hook-form";
import { DescricaoEventoSection } from "./form-sections/descricao-evento.section";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormSiscoaf, formSiscoafSchema } from "./form-siscoaf.schema";
import { formDefaultValues, formLabels } from "./constants";
import { OcorrenciasEventoSection } from "./form-sections/ocorrencias-evento.section";
import { EnvolvidosEventoSection } from "./form-sections/envolvidos-evento.section";

export function FormSiscoaf() {
  const form = useForm<IFormSiscoaf>({
    resolver: zodResolver(formSiscoafSchema),
    defaultValues: formDefaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex grow flex-col gap-16">
        <DescricaoEventoSection />
        <EnvolvidosEventoSection />
        <OcorrenciasEventoSection />

        <Button type="submit" className="self-end">
          {formLabels.btnSubmit}
        </Button>
      </form>
    </Form>
  );
}
