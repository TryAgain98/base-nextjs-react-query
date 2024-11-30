import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import { QUERY_KEY } from "@/constants";
import ProductList from "./";

export default async function ProductsPage() {
  const queryClient = new QueryClient();
  const productService = new ProductService();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_LIST],
    queryFn: () => productService.getProductList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  );
}
