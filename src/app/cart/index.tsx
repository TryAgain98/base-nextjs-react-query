"use client";
import React, { useEffect, useState } from "react";
import { useCartListQuery, useDeleteCartMutation } from "@/hooks/react-query/useCartQuery";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import CartItem from "./CartItem";
import CheckBoxAll, { CheckBoxAllType } from "@/components/CheckBox/CheckBoxAll";
import { ICart } from "@/types";
import { useProductDetailsQuery } from "@/hooks/react-query/useProductQuery";
import { PRODUCT_ID } from "../product/details/constant";
export interface ICartCheck extends ICart {
  isChecked: boolean;
}

const Cart = () => {
  const { data: productDetails } = useProductDetailsQuery({ productId: PRODUCT_ID });
  const [carts, setCarts] = useState<ICartCheck[]>();
  const { data, refetch: refetchCarts } = useCartListQuery();
  const [checkedAll, setCheckedAll] = useState<CheckBoxAllType>("none");
  const { mutate: deleteCart } = useDeleteCartMutation();

  const updateCarts = (checkAll?: boolean) => {
    if (data) {
      const newCarts = data.map((cart) => {
        return {
          ...cart,
          isChecked: !!checkAll ? true : false,
        };
      });
      setCarts(newCarts);
    }
  };

  const onCheckAll = (check: CheckBoxAllType) => {
    setCheckedAll(check);
    if (check === "all") {
      return updateCarts(true);
    }
    updateCarts(false);
  };

  useEffect(() => {
    updateCarts();
  }, [JSON.stringify(data)]);

  const updateCheckAll = () => {
    const numberOfChecked = carts?.filter((item) => item.isChecked).length || 0;

    if (numberOfChecked === 0) {
      setCheckedAll("none");
    } else if (numberOfChecked === carts?.length) {
      setCheckedAll("all");
    } else {
      setCheckedAll("some");
    }
  };

  const getTotalPrice = () => {
    if (productDetails && carts) {
      return (
        carts
          .filter((cart) => cart.isChecked)
          .reduce((total, cart) => total + productDetails.sellPrice * cart.quantity, 0) || 0
      );
    }
    return 0;
  };

  const onDeleteSelected = () => {
    if (checkedAll === "none") return;

    if (carts) {
      const cartsToDelete = carts.filter((cart) => cart.isChecked).map((cart) => cart.id);

      Promise.all(
        cartsToDelete.map(
          (id) =>
            new Promise(() => {
              deleteCart(id, {
                onSuccess: () => {
                  refetchCarts();
                },
              });
            })
        )
      ).catch((error) => {
        console.error("Failed to delete selected carts:", error);
      });
    }
  };

  const getNumberOfChecked = () => {
    return carts?.filter((cart) => cart.isChecked).length ?? 0;
  };

  useEffect(() => {
    updateCheckAll();
  }, [JSON.stringify(carts)]);

  return (
    <div className="p-4 space-y-4 text-sm">
      <div className="flex justify-between items-center">
        <CheckBoxAll
          checked={checkedAll}
          onChange={onCheckAll}
          label={`전체선택 (${getNumberOfChecked()}/${carts?.length})`}
        />
        <Button variant="secondary" className="rounded-sm" disabled={checkedAll === "none"} onClick={onDeleteSelected}>
          선택삭제
        </Button>
      </div>
      <Divider />
      <div className="overflow-auto custom-scrollbar space-y-4 pr-2" style={{ height: "calc(100vh - 250px)" }}>
        {carts?.map((cart) => (
          <CartItem key={cart.id} cart={cart} carts={carts} setCarts={setCarts} />
        ))}
      </div>

      <div className="flex items-center justify-between ">
        <span className="font-bold">총 {getTotalPrice()}원</span>
        <Button className="px-7 py-3" disabled={checkedAll === "none"}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default Cart;
