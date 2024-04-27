import { queryOptions as tanstackQueryOptions } from "@tanstack/react-query";
import { occurrencesEndpoints } from "./occurrences.endpoints";
import { OccurrencesCriteria } from "./ocurrences.schemas";

export function getCriteria() {
  const queryKey = ["occurrences-criteria"];
  const queryOptions = tanstackQueryOptions<OccurrencesCriteria[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        `${occurrencesEndpoints.baseUrl}/${occurrencesEndpoints.getCriteria}`,
      );

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
  });

  return { queryKey, queryOptions };
}
