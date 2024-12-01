"use client";
import { useCartListQuery } from "@/hooks/react-query/useCartQuery";

function ProductDetails() {
  const { data } = useCartListQuery();
  console.log({ data });
  return (
    <div>
      <div>{"sdfds"}</div>
    </div>
  );
}

export default ProductDetails;
