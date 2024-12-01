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
import Loading from "@/components/Loading";
export interface ICartCheck extends ICart {
  isChecked: boolean;
}

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: productDetails } = useProductDetailsQuery({ productId: PRODUCT_ID });
  const [carts, setCarts] = useState<ICartCheck[]>();
  const { data, refetch: refetchCarts } = useCartListQuery();
  const [checkedAll, setCheckedAll] = useState<CheckBoxAllType>("none");
  const { mutate: deleteCart } = useDeleteCartMutation();
  const isEmpty = !!carts && carts.length === 0;

  const updateCarts = (checkAll?: boolean) => {
    if (data) {
      const newCarts = data.map((cart) => {
        return {
          ...cart,
          isChecked: !!checkAll ? true : false,
        };
      });
      setCarts(newCarts);
      setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-4 space-y-4 text-sm">
      {isEmpty ? (
        <div className="flex h-full flex-col gap-3 items-center justify-center min-h-64">
          <p>You have no products here.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-4">
            <CheckBoxAll
              checked={checkedAll}
              onChange={onCheckAll}
              label={`전체선택 (${getNumberOfChecked()}/${carts?.length ?? 0})`}
            />
            <Button
              variant="secondary"
              className="rounded-sm"
              disabled={checkedAll === "none"}
              onClick={onDeleteSelected}
            >
              선택삭제
            </Button>
          </div>
          <div className="px-4">
            <Divider />
          </div>
          <div className="overflow-auto custom-scrollbar" style={{ height: "calc(100vh - 250px)" }}>
            <div className="px-4 space-y-4">
              {carts?.map((cart) => (
                <CartItem key={cart.id} cart={cart} carts={carts} setCarts={setCarts} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <span className="font-bold">총 {getTotalPrice()}원</span>
            <Button className="px-7 py-3" disabled={checkedAll === "none"}>
              결제하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
