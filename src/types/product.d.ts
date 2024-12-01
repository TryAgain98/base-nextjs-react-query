export interface IProduct {
  id: string;
  frontBrand: {
    brandNameEng: string;
    brandNameKor: string;
    heartCount: number;
  };
  itemImage: {
    imageHeight: number;
    imageWidth: number;
    imageUrl: string;
  };
  itemName: string;
  itemNo: number;
  isDependentSellType: boolean;
  maxOrderQty: number;
  sellPrice: number;
  consumerPrice: number;
  deliveryInfo: string;
  discountRate: number;
  isSoldout: boolean;
}
