import axios, { AxiosInstance } from 'axios';
// import mpAdapter from 'axios-miniprogram-adapter';
import qs from 'qs';
import { DEFAULT_HOST, DEFAULT_REQUEST_TIMEOUT } from './const';
import { Datasheet } from './datasheet';
import { IHttpResponse, IVikaClientConfig } from './interface';
import { NodeManager } from './node';
import { SpaceManager } from './space';
import { mergeConfig, QPSController, isBrowser } from './utils';

// axios.defaults.adapter = mpAdapter;

export class Vika {
  config: IVikaClientConfig;
  axios: AxiosInstance;
  static QPSMap = new Map<string, { count: number, lastReqTimestamp: number }>();

  constructor(config: IVikaClientConfig) {
    if (!config?.token) {
      throw new Error('请传入 API Token。(登陆 vika.cn 在左下角用户中心获取)');
    }
    this.config = mergeConfig(config);
    this.axios = axios.create({
      baseURL: config.host || DEFAULT_HOST,
      timeout: config.requestTimeout || DEFAULT_REQUEST_TIMEOUT,
      headers: {
        common: {
          ...(this.config.disableClientUserAgent ? {} : (isBrowser ? { 'X-Vika-User-Agent': 'VikaJSSDK' } : { 'User-Agent': 'VikaJSSDK' })),
          Authorization: 'Bearer ' + config.token,
        }
      },
      paramsSerializer: params => {
        // TODO: 支持更多种 stringify 配置
        const result = qs.stringify(params, { arrayFormat: 'brackets' });
        // console.log('paramsSerializer after', result);
        return result;
      }
    });

    // open it for debug
    this.axios.interceptors.request.use(request => {
      // console.log('Starting Request: ', request.method, {
      //   url: request.url,
      //   params: request.params,
      //   data: request.data,
      // });
      return request;
    });
    this.axios.interceptors.request.use(QPSController());

    this.axios.interceptors.response.use(response => {
      // console.log('Response:', response.data);
      return response;
    });
  }

  async request<T>(config: {
    path: string;
    params?: any,
    method: 'get' | 'post' | 'patch' | 'delete',
    data?: { [key: string]: any },
    headers?: any;
    timeout?: number;
  }): Promise<IHttpResponse<T>> {
    const { path, params, method, data, headers, timeout } = config;
    let result: IHttpResponse<T>;
    try {
      result = (await this.axios.request<IHttpResponse<T>>({
        timeout,
        url: path,
        method,
        params,
        data,
        headers,
      })).data;
    } catch (e) {
      const error = e?.response?.data || e;
      result = {
        success: false,
        code: error?.code || 500,
        message: error?.message || '请求参数配置错误',
      };
    }

    if (!result.success) {
      console.error('请求发生错误：', result);
    }

    return result;
  }

  /**
   * 资源-数表管理
   * @param datasheetId 数表ID
   * @returns 
   */
  datasheet(datasheetId: string) {
    if (!datasheetId) {
      throw new Error('请传入维格表Id, 可以从维格表 url 上获取，维格表 id 通常以 dst 开头');
    }
    return new Datasheet(datasheetId, this);
  }

  /**
   * 节点管理
   */
  get nodes() {
    return new NodeManager(this);
  }

  /**
   * 空间
   */
  get spaces() {
    return new SpaceManager(this);
  }
}
