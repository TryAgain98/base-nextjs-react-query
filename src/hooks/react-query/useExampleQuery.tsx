"use client";

import { QUERY_KEY } from "@/constants";
import ExampleService from "@/services/example.service";
import { useQuery } from "@tanstack/react-query";

const exampleService = new ExampleService();

export function useExamplesQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.GET_EXAMPLES],
    queryFn: () => exampleService.getExampleList(),
  });
}

export function useExampleQuery({ userId }: { userId?: number }) {
  return useQuery({
    queryKey: [QUERY_KEY.GET_EXAMPLE, { userId }],
    queryFn: () => (userId ? exampleService.getExampleDetails(userId?.toString()) : null),
  });
}
