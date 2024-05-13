import "@/globals.css";
import { FormSiscoaf } from "@/features/form-siscoaf";
import { QueryClientProvider } from "@/config/providers/query-client.provider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <QueryClientProvider>
      <FormSiscoaf />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
