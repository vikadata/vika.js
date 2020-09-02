import { IHttpSuccessResponse, IRecordPage, IFindRecords, IRecord } from './interface';
import axios, { AxiosInstance } from 'axios';

export interface ISortConfig { [fieldKey: string]: 'asc' | 'desc' }

export interface ISelectConfig {
  pageSize?: number; // 指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数
  maxRecords?: number; // 限制返回记录的最大总数量, 如果记录总数 total 大于此值，则会被限制为 maxRecords。
  pageNum?: number; // 指定分页的页码，与参数size配合使用，从 1 开始
  sort?: ISortConfig[]; // 对指定维格表的记录进行排序
  recordIds?: string[]; // 查询指定的 record，并按照 id 的顺序返回 record 内容
  viewId?: string; // 视图ID。如果附带此参数，则只返回经过视图筛选和排序后的记录合集
  fields?: string[]; // 指定要返回的字段（默认为字段名, 也可以通过 fieldKey 指定为字段 Id）。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回
  filterByFormula?: string; // 使用公式作为筛选条件，返回匹配的记录，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解公式使用方式
  cellFormat?: 'json' | 'string'; // 单元格值类型，默认为 json，指定为 string 时所有值都将被自动转换为 string 格式。
  fieldKey?: 'name' | 'id'; // 指定 field 的查询和返回的 key。默认为 name 使用列名作为 key，指定为 id 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
}

declare const isBundleForBrowser: boolean;

export interface IAuthConfig {
  token: string;
  fieldKey?: 'name' | 'id'; // 指定 field 的查询和返回的 key。默认为 name 使用列名作为 key，指定为 id 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
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

    // this.axios.interceptors.request.use(request => {
    //   console.log('Starting Request', {
    //     url: request.url,  
    //     params: request.params,
    //     data: request.data,
    //   });
    //   return request;
    // });

    // this.axios.interceptors.response.use(response => {
    //   console.log('Response:', response.data);
    //   return response;
    // });
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

  getRecords<T = IRecordPage>(datasheetId: string, params?: ISelectConfig) {
    return this.records<T>({ datasheetId, params: { fieldKey: this.config.fieldKey, ...params }, method: 'get' });
  }

  findRecords(datasheetId: string, recordIds: string[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.getRecords<IFindRecords>(datasheetId, { recordIds, fieldKey });
  }

  createRecords<T = IRecord[]>(datasheetId: string, records: IRecord[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.records<T>({ datasheetId, data: { records, fieldKey }, method: 'post' });
  }

  updateRecords<T = IRecord[]>(datasheetId: string, records: IRecord[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.records<T>({ datasheetId, data: { records, fieldKey }, method: 'post' });
  }

  delRecords<T = boolean>(datasheetId: string, recordIds: string[]) {
    return this.records<T>({ datasheetId, data: { recordIds }, method: 'delete' });
  }
}
