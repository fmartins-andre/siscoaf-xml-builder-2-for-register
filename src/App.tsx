import "@/globals.css";
import { SimpleLayout } from "@/components/layouts/simple-layout";
import { FormSiscoaf } from "@/features/form-siscoaf";
import { QueryClientProvider } from "@/config/providers/query-client.provider";

function App() {
  return (
    <QueryClientProvider>
      <SimpleLayout>
        <FormSiscoaf />
      </SimpleLayout>
    </QueryClientProvider>
  );
}

export default App;
