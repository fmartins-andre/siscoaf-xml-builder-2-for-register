import { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as TankstackQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <TankstackQueryClientProvider client={queryClient}>
      {children}
    </TankstackQueryClientProvider>
  );
}
