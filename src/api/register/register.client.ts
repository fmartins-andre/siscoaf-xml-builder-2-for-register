import {
  queryOptions as tanstackQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { registerEndpoints } from "./register.endpoints";
import { RegisterData } from "./register.schemas";

export function getProtocol(protocol: string) {
  const queryKey = ["register-protocol", protocol];
  const queryOptions = tanstackQueryOptions<RegisterData>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        `${registerEndpoints.baseUrl}/${registerEndpoints.getProtocol}/${protocol}`,
      );

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
    enabled: Boolean(protocol),
  });

  return { queryKey, queryOptions };
}

export const useLazyGetProtocol = () => {
  const queryClient = useQueryClient();
  return (protocol: string) =>
    queryClient.ensureQueryData(getProtocol(protocol).queryOptions);
};
