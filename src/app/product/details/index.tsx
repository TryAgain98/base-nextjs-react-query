"use client";
import { useProductDetailsQuery } from "@/hooks/react-query/useProductQuery";

function ProductDetails() {
  const { data } = useProductDetailsQuery({ productId: "1" });

  return (
    <div>
      {data?.itemName}
      <div></div>
    </div>
  );
}

export default ProductDetails;
