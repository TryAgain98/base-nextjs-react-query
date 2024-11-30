import { ICart } from "@/types/cart";
import BaseService from "./base.service";

class CartService extends BaseService {
  constructor() {
    super({ path: "carts" });
  }

  getCartList() {
    return this.get<ICart[]>({});
  }

  createCart(cart: Omit<ICart, "id">) {
    return this.create<ICart>({ body: cart });
  }

  getCartDetails(id: string) {
    return this.get<ICart>({ id: id });
  }
}

export default CartService;
