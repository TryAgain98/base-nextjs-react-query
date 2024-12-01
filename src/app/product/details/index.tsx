"use client";
import Button from "@/components/Button";
import ImageCarousel from "@/components/Carousel";
import ReusableSelect from "@/components/Select";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { additionalOptions, colorOptions, sizeOptions } from "./constant";
import { useProductDetailsQuery } from "@/hooks/react-query/useProductQuery";
import { formatPrice } from "@/utils/price";
import { useMutation } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import { ICart } from "@/types";
import { useRouter } from "next/navigation";
import { SCREENS } from "@/constants";

interface FormValues {
  size: string;
  color: string;
  additionalOption: string;
}

export default function ProductDetails() {
  const router = useRouter();
  const cartService = new CartService();
  const { data: productDetails } = useProductDetailsQuery({ productId: "1" });
  const { mutate: onCreateCart } = useMutation({
    mutationFn: (bodyData: Omit<ICart, "id">) => cartService.createCart(bodyData),
    onSuccess: () => {
      alert("Add successfully");
      router.push(SCREENS.CART);
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      size: "",
      color: "",
      additionalOption: "",
    },
  });

  const watchSize = watch("size");
  const watchColor = watch("color");

  const isDisabled = watchSize === "L" && watchColor === "Black";

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isDisabled) {
      alert("The L size in Black is out of stock");
      return;
    }
    const bodyData: Omit<ICart, "id"> = {
      ...data,
      productId: "1",
      quantity: 1,
    };
    onCreateCart(bodyData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <ImageCarousel
        images={[
          "https://img.29cm.co.kr/item/202308/11ee4315d967d9ff8a69c7b418cbe14c.jpeg",
          "https://down-vn.img.susercontent.com/file/vn-11134201-7ras8-m2opgzhxpj4676",
          "https://down-vn.img.susercontent.com/file/vn-11134201-7ras8-m2opgzw33f2ead",
        ]}
      />
      <span className="flex gap-1 items-center text-[gray]">
        <span>Brand</span>
        <ChevronRightIcon className="h-4 w-4" />
      </span>
      <div>
        <p> {productDetails?.itemName}</p>
        <p> {formatPrice(productDetails?.sellPrice)}</p>
      </div>
      <ReusableSelect label="사이즈" name="size" options={sizeOptions} control={control} required />
      <ReusableSelect label="색상" name="color" options={colorOptions} control={control} required />
      <ReusableSelect label="추가옵션" name="additionalOption" options={additionalOptions} control={control} />
      <Button type="submit" disabled={!isValid || isDisabled} className="w-full">
        장바구니 담기
      </Button>
    </form>
  );
}
