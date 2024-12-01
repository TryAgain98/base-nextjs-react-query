"use client";
import Button from "@/components/Button";
import ImageCarousel from "@/components/Carousel";
import ReusableSelect from "@/components/Select";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { additionalOptions, colorOptions, PRODUCT_ID, sizeOptions } from "./constant";
import { useProductDetailsQuery } from "@/hooks/react-query/useProductQuery";
import { formatPrice } from "@/utils/price";
import CartService from "@/services/cart.service";
import { ICart } from "@/types";
import { useCreateCartMutation, useUpdateCartMutation } from "@/hooks/react-query/useCartQuery";
import { SCREENS } from "@/constants";
import { useRouter } from "next/navigation";

interface FormValues {
  size: string;
  color: string;
  additionalOption: string;
}

export default function ProductDetails() {
  const cartService = new CartService();
  const router = useRouter();
  const { data: productDetails } = useProductDetailsQuery({ productId: PRODUCT_ID });
  const { mutate: onCreateCart } = useCreateCartMutation();
  const { mutate: updateCart } = useUpdateCartMutation();

  const handleSuccess = () => {
    router.push(`${SCREENS.CART}`);
    router.refresh();
  };

  const checkExitProductInCart = async (body: Omit<ICart, "id">) => {
    const params: Omit<ICart, "id" | "quantity"> = {
      size: body.size,
      additionalOption: body.additionalOption,
      color: body.color,
      productId: body.productId,
    };
    const data = await cartService.getCartList(params);
    if (data.length > 0) {
      return updateCart(
        { ...data[0], quantity: data[0].quantity + 1 },
        {
          onSuccess() {
            handleSuccess();
          },
        }
      );
    }
    onCreateCart(body, {
      onSuccess() {
        handleSuccess();
      },
    });
  };

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
      productId: PRODUCT_ID,
      quantity: 1,
    };
    checkExitProductInCart(bodyData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm pb-5">
      <ImageCarousel images={productDetails?.images ?? []} />
      <div className="px-4 space-y-4 ">
        <span className="flex gap-1 items-center text-[gray]">
          <span>Brand</span>
          <ChevronRightIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-medium"> {productDetails?.itemName}</p>
          <p className="font-medium"> {formatPrice(productDetails?.sellPrice)}</p>
        </div>
        <ReusableSelect label="사이즈" name="size" options={sizeOptions} control={control} required />
        <ReusableSelect label="색상" name="color" options={colorOptions} control={control} required />
        <ReusableSelect label="추가옵션" name="additionalOption" options={additionalOptions} control={control} />
        <Button type="submit" disabled={!isValid || isDisabled} className="w-full py-3">
          장바구니 담기
        </Button>
      </div>
    </form>
  );
}
