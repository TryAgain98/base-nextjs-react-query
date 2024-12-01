"use client";
import { useProductListQuery } from "@/hooks/react-query/useProductQuery";

function ProductList() {
  const productListQuery = useProductListQuery();
  return (
    <div className="">
      <div>
        {productListQuery.data?.map((product) => (
          <p key={product.id}>{product.itemName}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
