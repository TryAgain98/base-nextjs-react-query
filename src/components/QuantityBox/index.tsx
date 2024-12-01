import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const QuantityBox = () => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <div className="flex items-center border border-gray-300">
      <button onClick={decrement} className="px-1">
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
