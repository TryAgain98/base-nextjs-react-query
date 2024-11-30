"use client";
import { useCartDetailsQuery } from "@/hooks/react-query/useCartQuery";

function ProductDetails() {
  const { data } = useCartDetailsQuery({ cartId: "1" });

  return (
    <div>
      <div>{data?.color.name}</div>
    </div>
  );
}

export default ProductDetails;
