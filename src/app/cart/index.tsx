"use client";
import React, { useEffect, useState } from "react";
import { useCartListQuery } from "@/hooks/react-query/useCartQuery";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import CartItem from "./CartItem";
import CheckBoxAll, { CheckBoxAllType } from "@/components/CheckBox/CheckBoxAll";
import { ICart } from "@/types";
export interface ICartCheck extends ICart {
  isChecked: boolean;
}

const App = () => {
  const [cartCheck, setCartCheck] = useState<ICartCheck[]>();
  const { data: carts } = useCartListQuery();
  const [isCheckedAll, setIsCheckedAll] = useState<CheckBoxAllType>("none");

  const updateCartCheck = (checkAll?: boolean) => {
    if (carts) {
      const newCarts = carts.map((cart) => {
        return {
          ...cart,
          isChecked: !!checkAll ? true : false,
        };
      });
      setCartCheck(newCarts);
    }
  };

  const onCheckAll = (check: CheckBoxAllType) => {
    setIsCheckedAll(check);
    if (check === "all") {
      return updateCartCheck(true);
    }
    updateCartCheck(false);
  };

  useEffect(() => {
    updateCartCheck();
  }, [JSON.stringify(carts)]);

  const updateCheckAll = () => {
    const numberOfChecked = cartCheck?.filter((item) => item.isChecked).length || 0;

    if (numberOfChecked === 0) {
      setIsCheckedAll("none");
    } else if (numberOfChecked === cartCheck?.length) {
      setIsCheckedAll("all");
    } else {
      setIsCheckedAll("some");
    }
  };

  useEffect(() => {
    updateCheckAll();
  }, [cartCheck]);

  return (
    <div className="p-4 space-y-4 text-sm">
      <div className="flex justify-between items-center">
        <CheckBoxAll checked={isCheckedAll} onChange={onCheckAll} label={`전체선택 (5/${carts?.length})`} />
        <Button variant="secondary" className="rounded-sm ">
          선택삭제
        </Button>
      </div>
      <Divider />
      <div className="overflow-auto custom-scrollbar space-y-4 pr-2" style={{ height: "calc(100vh - 250px)" }}>
        {carts?.map((cart) => (
          <CartItem key={cart.id} cart={cart} cartCheck={cartCheck} setCartCheck={setCartCheck} />
        ))}
      </div>

      <div className="flex items-center justify-between ">
        <span className="font-bold">총 379,000원</span>
        <Button className="px-7 py-3">결제하기</Button>
      </div>
    </div>
  );
};

export default App;
