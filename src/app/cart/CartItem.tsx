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

interface IProps {
  cart: ICart;
  cartCheck?: ICartCheck[];
  setCartCheck: (cartCheck: ICartCheck[]) => void;
}

function CartItem({ cart, cartCheck, setCartCheck }: IProps) {
  const { data: productDetails } = useProductDetailsQuery({ productId: cart.productId });

  const getIndexCartCheck = () => {
    if (!cartCheck) return -1;
    return cartCheck?.findIndex((item) => item.id === cart.id);
  };

  const getIsChecked = () => {
    const indexCartCheck = getIndexCartCheck();
    if (indexCartCheck != -1 && cartCheck) {
      return cartCheck[indexCartCheck].isChecked;
    }
    return false;
  };

  const onCheck = () => {
    const indexCartCheck = getIndexCartCheck();
    if (indexCartCheck != -1 && cartCheck) {
      const updatedCartCheck = [...cartCheck];
      updatedCartCheck[indexCartCheck] = {
        ...updatedCartCheck[indexCartCheck],
        isChecked: !updatedCartCheck[indexCartCheck].isChecked,
      };
      setCartCheck(updatedCartCheck);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <CheckBox checked={getIsChecked()} onChange={onCheck} label={`[Brand] ${productDetails?.itemName}`} />
        <XMarkIcon className="w-5 h-5 cursor-pointer" />
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
        <span className="font-bold">75,000원</span>
        <div className="flex gap-3">
          <Button variant="outline">쿠폰적용</Button>
          <QuantityBox />
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default CartItem;
