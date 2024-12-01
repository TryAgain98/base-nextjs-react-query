import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import CartDetails from ".";
import CartService from "@/services/cart.service";

export default async function PostsPage() {
  const queryClient = new QueryClient();
  const cartService = new CartService();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_CART_LIST],
    queryFn: () => cartService.getCartList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartDetails />
    </HydrationBoundary>
  );
}
