import { useForm } from "react-hook-form";
import { DescricaoEventoSection } from "./form-sections/descricao-evento.section";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormSiscoaf, formSiscoafSchema } from "./form-siscoaf.schema";
import { formDefaultValues, formLabels } from "./constants";
import { OcorrenciasEventoSection } from "./form-sections/ocorrencias-evento.section";
import { EnvolvidosEventoSection } from "./form-sections/envolvidos-evento.section";
import { useHandleSubmit } from "./helpers/use-handle-submit.hook";

export function FormSiscoaf() {
  const form = useForm<IFormSiscoaf>({
    resolver: zodResolver(formSiscoafSchema),
    defaultValues: formDefaultValues,
  });

  const { onSubmitHandler } = useHandleSubmit(form.handleSubmit);

  return (
    <Form {...form}>
      <form onSubmit={onSubmitHandler} className="flex grow flex-col gap-16">
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
