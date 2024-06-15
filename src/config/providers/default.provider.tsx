import "@/globals.css";
import { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as TankstackQueryClientProvider,
} from "@tanstack/react-query";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";
import { z } from "zod";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";

setDefaultOptions({ locale: ptBR });

i18next.init({
  lng: "pt",
  resources: {
    pt: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

const queryClient = new QueryClient();

export function DefaultProvider({ children }: PropsWithChildren) {
  return (
    <TankstackQueryClientProvider client={queryClient}>
      {children}
    </TankstackQueryClientProvider>
  );
}
