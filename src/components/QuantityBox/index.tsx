import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface IProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityBox = ({ quantity, setQuantity }: IProps) => {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };

  return (
    <div className="flex items-center border border-gray-300">
      <button
        onClick={decrement}
        disabled={quantity === 1}
        className={`px-1 ${quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <MinusIcon className="h-5 w-5 text-primary" />
      </button>
      <span className="px-2">{quantity}</span>
      <button onClick={increment} className="px-1">
        <PlusIcon className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

export default QuantityBox;
