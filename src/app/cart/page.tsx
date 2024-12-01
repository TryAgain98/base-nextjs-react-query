import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import Cart from ".";
import CartService from "@/services/cart.service";
import Layout from "@/components/layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CartPage() {
  const queryClient = new QueryClient();
  const cartService = new CartService();

  console.log("=============================");
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_CART_LIST],
    queryFn: () => cartService.getCartList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Layout headerTitle="장바구니">
        <Cart />
      </Layout>
    </HydrationBoundary>
  );
}
