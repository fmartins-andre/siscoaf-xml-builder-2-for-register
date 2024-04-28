import { queryOptions as tanstackQueryOptions } from "@tanstack/react-query";

import { relatedPeopleEndpoints } from "./related-people.endpoints";
import { RelatedPeopleTypes } from "./related-people.schemas";

export function getTypes() {
  const queryKey = ["related-people-types"];
  const queryOptions = tanstackQueryOptions<RelatedPeopleTypes>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(
        `${relatedPeopleEndpoints.baseUrl}/${relatedPeopleEndpoints.getTypes}`,
      );

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
  });

  return { queryKey, queryOptions };
}
