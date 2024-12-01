"use client";

import { QUERY_KEY } from "@/constants";
import CartService from "@/services/cart.service";
import { ICart } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useCreateCartMutation() {
  return useMutation({
    mutationFn: (bodyData: Omit<ICart, "id">) => cartService.createCart(bodyData),
  });
}

export function useUpdateCartMutation() {
  return useMutation({
    mutationFn: (body: ICart) => cartService.updateCart(body),
  });
}

export function useDeleteCartMutation() {
  return useMutation({
    mutationFn: (id: string) => cartService.deleteCart(id),
  });
}
