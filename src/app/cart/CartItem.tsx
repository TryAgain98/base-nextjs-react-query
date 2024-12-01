import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import Divider from "@/components/Divider";
import QuantityBox from "@/components/QuantityBox";
import Tag from "@/components/Tag";
import { useProductDetailsQuery } from "@/hooks/react-query/useProductQuery";
import { ICart } from "@/types";
import { formatPrice } from "@/utils/price";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ICartCheck } from ".";
import { useDeleteCartMutation, useUpdateCartMutation } from "@/hooks/react-query/useCartQuery";

interface IProps {
  cart: ICart;
  carts?: ICartCheck[];
  setCarts: (carts: ICartCheck[]) => void;
}

function CartItem({ cart, carts, setCarts }: IProps) {
  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: deleteCart } = useDeleteCartMutation();
  const { data: productDetails } = useProductDetailsQuery({ productId: cart.productId });

  const getIndexCartCheck = () => {
    if (!carts) return -1;
    return carts?.findIndex((item) => item.id === cart.id);
  };

  const getIsChecked = () => {
    const indexCartCheck = getIndexCartCheck();
    if (indexCartCheck != -1 && carts) {
      return carts[indexCartCheck].isChecked;
    }
    return false;
  };

  const onCheck = () => {
    const indexCartCheck = getIndexCartCheck();
    if (indexCartCheck != -1 && carts) {
      const updatedCartCheck = [...carts];
      updatedCartCheck[indexCartCheck] = {
        ...updatedCartCheck[indexCartCheck],
        isChecked: !updatedCartCheck[indexCartCheck].isChecked,
      };
      setCarts(updatedCartCheck);
    }
  };

  const onChangeQuantity = (quantity: number) => {
    updateCart({ ...cart, quantity });
    const indexCartCheck = getIndexCartCheck();
    if (indexCartCheck != -1 && carts) {
      const updatedCartCheck = [...carts];
      updatedCartCheck[indexCartCheck] = {
        ...updatedCartCheck[indexCartCheck],
        quantity: quantity,
      };
      setCarts(updatedCartCheck);
    }
  };

  const onDeleteCart = () => {
    deleteCart(cart.id);
    if (carts) {
      const updatedCarts = carts.filter((item) => item.id !== cart.id);
      setCarts(updatedCarts);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <CheckBox checked={getIsChecked()} onChange={onCheck} label={`[Brand] ${productDetails?.itemName}`} />
        <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={onDeleteCart} />
      </div>
      <div className="flex gap-3 text-xs">
        <img src={productDetails?.itemImage.imageUrl} alt="product" className="w-[100px] height-[100px]" />
        <div>
          <p className="font-medium">{formatPrice(productDetails?.sellPrice)}원</p>
          <p className="text-gray-500">할인적용 : 없음</p>
          <p className="text-gray-500">배송비 : 29CM 무료배송</p>
          <div className="flex gap-1 mt-1">
            <Tag>{cart.size}</Tag>
            <Tag>{cart.color}</Tag>
            {!!cart.additionalOption && <Tag>{cart.additionalOption}</Tag>}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">{formatPrice((productDetails?.sellPrice ?? 0) * cart.quantity)}원</span>
        <div className="flex gap-3">
          <Button variant="outline">쿠폰적용</Button>
          <QuantityBox quantity={cart.quantity} setQuantity={onChangeQuantity} />
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default CartItem;
