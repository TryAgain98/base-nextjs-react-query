"use client";
import Button from "@/components/Button";
import ImageCarousel from "@/components/Carousel";
import ReusableSelect from "@/components/Select";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { additionalOptions, colorOptions, sizeOptions } from "./constant";

interface FormValues {
  size: string;
  color: string;
  additionalOption: string;
}

export default function AddToCartForm() {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      size: "",
      color: "",
      additionalOption: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  const watchSize = watch("size");
  const watchColor = watch("color");

  const isDisabled = !watchSize || !watchColor || (watchSize === "L" && watchColor === "Black");

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
        <p> 클래식 런치박스</p>
        <p> 75,000</p>
      </div>
      <ReusableSelect label="사이즈" name="size" options={sizeOptions} control={control} required />
      <ReusableSelect label="색상" name="color" options={colorOptions} control={control} required />
      <ReusableSelect label="추가옵션" name="additionalOption" options={additionalOptions} control={control} />
      <Button type="submit" disabled={isDisabled} className="w-full">
        장바구니 담기
      </Button>
    </form>
  );
}
