import { queryOptions as tanstackQueryOptions } from "@tanstack/react-query";

import { AddressCity, AddressState } from "./address.schemas";
import { addressEndpoints } from "./address.endpoints";
import { UF } from "./address.schemas";

export function getStates() {
  const queryKey = ["address-states"];
  const queryOptions = tanstackQueryOptions<AddressState[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        `${addressEndpoints.baseUrl}/${addressEndpoints.getStates}`,
      );

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
  });

  return { queryKey, queryOptions };
}

export function getCitiesByState(state: UF | null) {
  const queryKey = ["address-cities", state];
  const queryOptions = tanstackQueryOptions<AddressCity[]>({
    queryKey,
    queryFn: async () => {
      if (!state) throw new Error("Give state is invalid");

      const response = await fetch(
        `${addressEndpoints.baseUrl}/${addressEndpoints.getCitiesByState}/${state}`,
      );

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
    enabled: Boolean(state),
  });

  return { queryKey, queryOptions };
}
