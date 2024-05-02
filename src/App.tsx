import "@/globals.css";
import { FormSiscoaf } from "@/features/form-siscoaf";
import { QueryClientProvider } from "@/config/providers/query-client.provider";

function App() {
  return (
    <QueryClientProvider>
      <FormSiscoaf />
    </QueryClientProvider>
  );
}

export default App;
