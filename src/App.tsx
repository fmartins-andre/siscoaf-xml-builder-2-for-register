import { FormSiscoaf } from "@/features/form-siscoaf";
import { Toaster } from "@/components/ui/sonner";
import { DefaultProvider } from "@/config/providers/default.provider";

function App() {
  return (
    <DefaultProvider>
      <FormSiscoaf />
      <Toaster position="top-right" richColors />
    </DefaultProvider>
  );
}

export default App;
