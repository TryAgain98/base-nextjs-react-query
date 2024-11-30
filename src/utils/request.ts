import axios from "axios";
import { SERVER_ENDPOINT } from "@/constants";

class Request {
  private instance;
  constructor(baseUrl?: string) {
    const instance = axios.create({
      baseURL: baseUrl || SERVER_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
      },
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject({
          message: error?.response?.data?.message || error?.message,
          status: error?.response?.status,
        });
      }
    );

    this.instance = instance;
  }

  get = (url: string, params?: object) => {
    return this.instance.get(url, { params });
  };

  post = (url: string, data?: object) => {
    return this.instance.post(url, data);
  };

  put = (url: string, data?: object) => {
    return this.instance.put(url, data);
  };

  patch = (url: string, data: object) => {
    return this.instance.patch(url, data);
  };

  delete = (url: string, data?: object) => {
    return this.instance.delete(url, { data });
  };

  upload(path: string, formData?: FormData) {
    return this.instance.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default Request;
