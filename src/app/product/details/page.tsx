import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import ProductDetails from ".";
import ProductService from "@/services/product.service";
import Layout from "@/components/layout";
import { PRODUCT_ID } from "./constant";

export default async function PostsPage() {
  const queryClient = new QueryClient();
  const productService = new ProductService();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_DETAILS],
    queryFn: () => productService.getProductDetails(PRODUCT_ID),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Layout headerTitle="상품상세">
        <ProductDetails />
      </Layout>
    </HydrationBoundary>
  );
}
