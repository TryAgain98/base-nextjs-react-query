import { ProductColorType, ProductSizeType } from "./product";

export interface ICart {
  id: string;
  productId: string;
  size: ProductSizeType;
  color: ProductColorType;
  quantity: number;
}
