import axios, { AxiosInstance } from "axios";
// import mpAdapter from 'axios-miniprogram-adapter';
import qs from "qs";
import { DEFAULT_HOST, DEFAULT_REQUEST_TIMEOUT } from "./const";
import { Datasheet } from "./datasheet";
import { IHttpResponse, IVikaClientConfig } from "./interface";
import { NodeManager } from "./node";
import { SpaceManager } from "./space";
import { mergeConfig, QPSController, isBrowser } from "./utils";

// axios.defaults.adapter = mpAdapter;
export class Vika {
  config: IVikaClientConfig;
  axios: AxiosInstance;
  static QPSMap = new Map<
    string,
    { count: number; lastReqTimestamp: number }
  >();

  constructor(config: IVikaClientConfig) {
    if (!config?.token) {
      throw new Error(
        "Please pass in the API Token.(登录 vika.cn 在左下角用户中心获取)"
      );
    }
    this.config = mergeConfig(config);
    this.axios = axios.create({
      baseURL: config.host || DEFAULT_HOST,
      timeout: config.requestTimeout || DEFAULT_REQUEST_TIMEOUT,
      headers: {
        common: {
          ...(this.config.disableClientUserAgent
            ? {}
            : isBrowser
            ? { "X-Vika-User-Agent": "VikaJSSDK" }
            : { "User-Agent": "VikaJSSDK" }),
          Authorization: "Bearer " + config.token,
        },
      },
      paramsSerializer: (params) => {
        // TODO: Support for more stringify configurations.
        const result = qs.stringify(params, { arrayFormat: "brackets" });
        // console.log('paramsSerializer after', result);
        return result;
      },
    });
    // Applet Adapter.
    if (this.config.adapter) {
      this.axios.defaults.adapter = this.config.adapter;
    }

    // open it for debug
    this.axios.interceptors.request.use((request) => {
      // console.log('Starting Request: ', request.method, {
      //   url: request.url,
      //   params: request.params,
      //   data: request.data,
      // });
      return request;
    });
    this.axios.interceptors.request.use(QPSController());

    this.axios.interceptors.response.use((response) => {
      // console.log('Response:', response.data);
      return response;
    });
  }

  async request<T>(config: {
    path: string;
    params?: any;
    method: "get" | "post" | "patch" | "delete";
    data?: { [key: string]: any };
    headers?: any;
    timeout?: number;
  }): Promise<IHttpResponse<T>> {
    const { path, params, method, data, headers, timeout } = config;
    let result: IHttpResponse<T>;
    try {
      result = (
        await this.axios.request<IHttpResponse<T>>({
          timeout,
          url: path,
          method,
          params: {
            fieldKey: this.config.fieldKey,
            ...params,
          },
          data,
          headers,
        })
      ).data;
    } catch (e) {
      const error = e?.response?.data || e;
      if (error?.code && error?.message) {
        result = {
          success: false,
          code: error!.code,
          message: error!.message,
        };
      } else {
        throw e;
      }
    }

    if (!result.success) {
      console.error("Request an error: ", result);
    }

    return result;
  }

  /**
   * Resources - Number Table Management.
   * @param datasheetId Datasheet ID
   * @returns
   */
  datasheet(datasheetId: string) {
    if (!datasheetId) {
      throw new Error(
        "Please pass the dimension datasheet id, which can be retrieved from the dimension datasheet url, " +
          "the dimension datasheet id usually starts with dst"
      );
    }
    return new Datasheet("", datasheetId, this);
  }

  /**
   * Node Management.
   */
  get nodes() {
    return new NodeManager(this);
  }

  /**
   * Space
   */
  get spaces() {
    return new SpaceManager(this);
  }

  /**
   * Get a single space.
   */
  space(spaceId: string) {
    return new SpaceManager(this, spaceId);
  }
}
