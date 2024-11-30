import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import ProductDetails from ".";
import ProductService from "@/services/product.service";

export default async function PostsPage() {
  const queryClient = new QueryClient();
  const productService = new ProductService();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_DETAILS],
    queryFn: () => productService.getProductDetails("1"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails />
    </HydrationBoundary>
  );
}
