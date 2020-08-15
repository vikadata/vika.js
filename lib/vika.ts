import axios, { AxiosInstance } from 'axios';
import { Datasheet } from './datasheet';

declare const isBundleForBrowser: boolean;

export interface IAuthConfig {
  token: string;
  host?: string;
  requestTimeout?: number; // 请求失效时间，默认10秒 (60000ms)
}

export const DEFAULT_HOST = 'https://api.vika.cn/fusion';
export const DEFAULT_REQUEST_TIMEOUT = 60000;

export class Vika {
  static auth(config: IAuthConfig) {
    return new Vika(config);
  }

  axios: AxiosInstance;

  constructor(public config?: IAuthConfig) {
    if (!config) {
      throw new Error('请传入 Developer Token。(登陆 vika.cn 在左下角用户中心获取)');
    }

    this.axios = axios.create({
      baseURL: config.host || DEFAULT_HOST,
      timeout: config.requestTimeout || DEFAULT_REQUEST_TIMEOUT,
      headers: {
        common: {
          ...(typeof isBundleForBrowser !== 'undefined' ? { 'X-Vika-User-Agent:': 'VikaJSSDK' } : { 'User-Agent': 'VikaJSSDK' }),
          Authorization: 'Bearer ' + config.token,
        }
      }
    });

    this.axios.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    })

    this.axios.interceptors.response.use(response => {
      console.log('Response:', response)
      return response
    })
  }

  datasheet(datasheetId: string) {
    if (!datasheetId) {
      throw new Error('请传入维格表Id, 可以从维格表 url 上获取，维格表 id 通常以 dst 开头');
    }

    return new Datasheet(datasheetId, this.axios);
  }
}
