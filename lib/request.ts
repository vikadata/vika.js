import { IHttpSuccessResponse, IRecordPage, IFindRecords, IRecord, IDeletedRecord } from './interface';
import axios, { AxiosInstance } from 'axios';

export interface ISortConfig { [fieldName: string]: 'asc' | 'desc' }

export interface ISelectConfig {
  viewId?: string; // 视图ID。如果附带此参数，则只返回经过视图筛选和排序后的记录合集
  fields?: string[]; // 指定要返回的字段。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回
  maxRecords?: number; // 指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数
  pageSize?: number; // 指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数
  pageNum?: number; // 查询的页码，从 1 开始
  sort?: ISortConfig[]; // 指定排序方式
  recordIds?: string[]; // 查询指定的 record，并按照 id 的顺序返回 record 内容
  filterByFormula?: string; // 筛选公式计算返回为 true 的内容，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解更多
}

declare const isBundleForBrowser: boolean;

export interface IAuthConfig {
  token: string;
  host?: string;
  requestTimeout?: number; // 请求失效时间，默认10秒 (60000ms)
}

export const DEFAULT_HOST = 'https://api.vika.cn/fusion';
export const DEFAULT_REQUEST_TIMEOUT = 60000;

export class Request {
  axios: AxiosInstance;

  constructor(public config: IAuthConfig) {
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
      console.log('Starting Request', {
        url: request.url,
        params: request.params,
        data: request.data,
      });
      return request;
    });

    this.axios.interceptors.response.use(response => {
      console.log('Response:', response.data);
      return response;
    });
  }

  private records<T>(config: {
    datasheetId: string,
    params?: ISelectConfig,
    method: 'get' | 'post' | 'patch' | 'delete',
    data?: { [key: string]: any },
  }) {
    const { datasheetId, params, method, data } = config;
    return this.axios.request<IHttpSuccessResponse<T>>({
      url: `/datasheets/${datasheetId}/records`,
      method,
      params,
      data,
    });
  }

  getRecords<T = IRecordPage>(datasheetId: string, params: ISelectConfig) {
    return this.records<T>({ datasheetId, params, method: 'get' });
  }

  createRecords<T = IRecord[]>(datasheetId: string, records: IRecord[]) {
    return this.records<T>({ datasheetId, data: { records }, method: 'post' });
  }

  updateRecords<T = IRecord[]>(datasheetId: string, records: IRecord[]) {
    return this.records<T>({ datasheetId, data: { records }, method: 'post' });
  }

  delRecords<T = boolean>(datasheetId: string, recordIds: string[]) {
    return this.records<T>({ datasheetId, data: { recordIds }, method: 'delete' });
  }

  find(datasheetId: string, recordIds: string[]) {
    return this.getRecords<IFindRecords>(datasheetId, { recordIds });
  }
}
