import "@/globals.css";
import { FormSiscoaf } from "@/features/form-siscoaf";
import { QueryClientProvider } from "@/config/providers/query-client.provider";
import { Toaster } from "./components/ui/sonner";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";

import translation from "zod-i18n-map/locales/pt/zod.json";
import { z } from "zod";

i18next.init({
  lng: "pt",
  resources: {
    pt: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

function App() {
  return (
    <QueryClientProvider>
      <FormSiscoaf />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
