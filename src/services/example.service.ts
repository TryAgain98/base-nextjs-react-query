import { ResGetExample } from "@/types/example";
import BaseService from "./base.service";

class ExampleService extends BaseService {
  constructor() {
    super({ path: "examples" });
  }

  getExampleList() {
    return this.get<ResGetExample[]>({});
  }

  createExample(user: Omit<ResGetExample, "id">) {
    return this.create<ResGetExample>({ body: user });
  }

  getExampleDetails(id: string) {
    return this.get<ResGetExample>({ id: id });
  }
}

export default ExampleService;
