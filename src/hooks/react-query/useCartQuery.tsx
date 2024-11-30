"use client";

import { QUERY_KEY } from "@/constants";
import CartService from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";

const cartService = new CartService();

export function useCartListQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CART_LIST],
    queryFn: () => cartService.getCartList(),
  });
}

export function useCartDetailsQuery({ cartId }: { cartId: string }) {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CART_DETAILS],
    queryFn: () => cartService.getCartDetails(cartId),
    enabled: !!cartId,
  });
}
