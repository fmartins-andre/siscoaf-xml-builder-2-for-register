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
import { SimpleLayout } from "@/components/layouts/simple-layout";
import { Input } from "@/components/ui/input";
import { useHandleLoadXml } from "./helpers/use-handle-load-xml.hook";

const formId = "siscoaf-form";

export function FormSiscoaf() {
  const form = useForm<IFormSiscoaf>({
    resolver: zodResolver(formSiscoafSchema),
    defaultValues: formDefaultValues,
  });

  const { onSubmitHandler } = useHandleSubmit({ form });
  const { loadXmlHandler } = useHandleLoadXml({ form });

  const resetData = () => form.reset(formDefaultValues);

  return (
    <Form {...form}>
      <SimpleLayout.Root>
        <SimpleLayout.Header className="justify-between">
          <Input
            type="file"
            className="sm:w-fit"
            accept="text/xml"
            onChange={loadXmlHandler}
          />

          <div className="flex flex-col gap-2 sm:w-fit sm:flex-row">
            <Button variant="secondary" type="button" onClick={resetData}>
              {formLabels.btnReset}
            </Button>

            <Button form={formId} type="submit">
              {formLabels.btnSubmit}
            </Button>
          </div>
        </SimpleLayout.Header>

        <SimpleLayout.Main>
          <form
            id={formId}
            className="flex grow flex-col gap-16 print:gap-4"
            onSubmit={onSubmitHandler}
          >
            <DescricaoEventoSection />
            <EnvolvidosEventoSection />
            <OcorrenciasEventoSection />
          </form>
        </SimpleLayout.Main>
      </SimpleLayout.Root>
    </Form>
  );
}
