import { ICart } from "@/types/cart";
import BaseService from "./base.service";

class CartService extends BaseService {
  constructor() {
    super({ path: "carts" });
  }

  getCartList(params?: Omit<ICart, "id" | "quantity">) {
    return this.get<ICart[]>({ params });
  }

  createCart(cart: Omit<ICart, "id">) {
    return this.create<ICart>({ body: cart });
  }

  updateCart(cart: ICart) {
    return this.edit<ICart>({ body: cart, id: cart.id });
  }

  deleteCart(id: string) {
    return this.delete<ICart>({ id: id });
  }

  getCartDetails(id: string) {
    return this.get<ICart>({ id: id });
  }
}

export default CartService;
