import Request from "@/utils/request";
import { RequestDataType, ResponseDataType } from "@/types";

export default class BaseService {
  private path;
  private request;
  constructor({ path, baseUrl }: { path: string; baseUrl?: string }) {
    this.path = path;
    this.request = new Request(baseUrl);
  }

  private getPath = (reqData: RequestDataType) => {
    const id = reqData?.id ? `/${reqData.id}` : "";
    return (reqData?.customPath || this.path) + id;
  };

  get = async <T>(reqData: Omit<RequestDataType, "body">): Promise<ResponseDataType<T>> => {
    return (await this.request.get(this.getPath(reqData), reqData.params)).data;
  };

  getDetails = async <T>(reqData: Omit<RequestDataType, "body" | "params">): Promise<ResponseDataType<T>> => {
    return (await this.request.get(this.getPath(reqData))).data;
  };

  create = async <T>(reqData: Omit<RequestDataType, "params" | "id">): Promise<ResponseDataType<T>> => {
    return (await this.request.post(this.getPath(reqData), reqData.body)).data;
  };

  upload = async <T>(reqData: Omit<RequestDataType, "params" | "id">): Promise<ResponseDataType<T>> => {
    return (await this.request.upload(this.getPath(reqData), reqData.body as FormData)).data;
  };

  edit = async <T>(reqData: Omit<RequestDataType, "params">): Promise<ResponseDataType<T>> => {
    return (await this.request.put(this.getPath(reqData), reqData.body)).data;
  };

  delete = async <T>(reqData: Omit<RequestDataType, "params" | "body">): Promise<ResponseDataType<T>> => {
    return (await this.request.delete(this.getPath(reqData))).data;
  };
}
