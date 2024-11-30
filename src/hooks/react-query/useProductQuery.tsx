"use client";

import { QUERY_KEY } from "@/constants";
import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

const productService = new ProductService();

export function useProductListQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_LIST],
    queryFn: () => productService.getProductList(),
  });
}

export function useProductDetailsQuery({ productId }: { productId: string }) {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_DETAILS],
    queryFn: () => productService.getProductDetails(productId),
    enabled: !!productId,
  });
}
