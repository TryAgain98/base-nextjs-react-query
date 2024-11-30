import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ExampleService from "@/services/example.service";
import { QUERY_KEY } from "@/constants";
import Test from ".";

export default async function PostsPage() {
  const queryClient = new QueryClient();
  const exampleService = new ExampleService();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_EXAMPLES],
    queryFn: () => exampleService.getExampleList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Test />
    </HydrationBoundary>
  );
}
