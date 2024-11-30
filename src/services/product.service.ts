import { IProduct } from "@/types/product";
import BaseService from "./base.service";

class ProductService extends BaseService {
  constructor() {
    super({ path: "products" });
  }

  getProductList() {
    return this.get<IProduct[]>({});
  }

  createProduct(product: Omit<IProduct, "id">) {
    return this.create<IProduct>({ body: product });
  }

  getProductDetails(id: string) {
    return this.get<IProduct>({ id: id });
  }
}

export default ProductService;
