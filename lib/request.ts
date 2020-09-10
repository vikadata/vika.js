import qs from 'qs';
import FormData from 'form-data';
import { IRecordPage, IFindRecords, IRecord, INewRecords, IHttpResponse, IRecordsResult, IAttachment } from './interface';
import axios, { AxiosInstance } from 'axios';
export interface ISortConfig { [fieldKey: string]: 'asc' | 'desc' }

export interface IGetRecordsConfig {
  /**
   * （选填）指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数。
   */
  pageSize?: number;
  /**
   * （选填）限制返回记录的总数量。如果该值小于表中实际的记录总数，则返回的记录总数会被限制为该值。
   */
  maxRecords?: number;
  /**
   * （选填）指定分页的页码，默认为 1，与参数pageSize配合使用。
   */
  pageNum?: number;
  /**
   * （选填）对指定维格表的记录进行排序。由多个“排序对象”组成的数组。支持顺序：'asc' 和 逆序：'desc'。注：此参数指定的排序条件将会覆盖视图里的排序条件。
   */
  sort?: ISortConfig[];
  /**
   * （选填）记录ID数组。如果附带此参数，则返回指定IDs的记录数组。 返回值按照传入数组的顺序排序。此时无视筛选、排序。无分页，每次最多查询 1000 条
   */
  recordIds?: string[];
  /**
   * （选填）视图ID。默认为维格表中第一个视图。请求会返回视图中经过视图中筛选/排序后的结果，可以搭配使用fields参数过滤不需要的字段数据
   */
  viewId?: string;
  /**
   * （选填）指定要返回的字段（默认为字段名, 也可以通过 fieldKey 指定为字段 Id）。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回。
   */
  fields?: string[];
  /**
   * （选填）使用公式作为筛选条件，返回匹配的记录，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解公式使用方式
   */
  filterByFormula?: string;
  /**
   * （选填）单元格值类型，默认为 'json'，指定为 'string' 时所有值都将被自动转换为 string 格式。
   */
  cellFormat?: 'json' | 'string';
  /**
   * （选填）指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey?: 'name' | 'id';
}

declare const isBundleForBrowser: boolean;

export interface IAuthConfig {
  token: string;
  /**
   * （选填）指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey?: 'name' | 'id';
  /**
   * （选填）请求失效时间，默认 60000ms (10 秒)
   */
  requestTimeout?: number;
  /**
   * （选填）目标服务器地址
   */
  host?: string;
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
      },
      paramsSerializer: params => {
        // TODO: 支持更多种 stringify 配置
        const result = qs.stringify(params, { arrayFormat: 'repeat' });
        // console.log('paramsSerializer after', result);
        return result;
      }
    });

    // open it for debug
    // this.axios.interceptors.request.use(request => {
    //   console.log('Starting Request: ', request.method, {
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

  private async apiRequest<T>(config: {
    apiName?: string,
    datasheetId: string,
    params?: IGetRecordsConfig,
    method: 'get' | 'post' | 'patch' | 'delete',
    data?: { [key: string]: any },
    headers?: any;
  }): Promise<IHttpResponse<T>> {
    const { apiName, datasheetId, params, method, data, headers } = config;
    let result: IHttpResponse<T>;
    try {
      result = (await this.axios.request<IHttpResponse<T>>({
        url: `/datasheets/${datasheetId}/${apiName || 'records'}`,
        method,
        params,
        data,
        headers,
      })).data;
    } catch (e) {
      const error = e?.response?.data;
      result = {
        success: false,
        code: error?.code,
        message: error?.message,
      };
    }

    if (!result.success) {
      console.error('请求发生错误：', result);
    }

    return result;
  }

  getRecords<T = IRecordPage>(datasheetId: string, params?: IGetRecordsConfig) {
    return this.apiRequest<T>({ datasheetId, params: { fieldKey: this.config.fieldKey, ...params }, method: 'get' });
  }

  findRecords(datasheetId: string, recordIds: string[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.getRecords<IFindRecords>(datasheetId, { recordIds, fieldKey });
  }

  addRecords<T = IRecordsResult>(datasheetId: string, records: INewRecords[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.apiRequest<T>({ datasheetId, data: { records, fieldKey }, method: 'post' });
  }

  updateRecords<T = IRecordsResult>(datasheetId: string, records: IRecord[], fieldKey?: 'name' | 'id') {
    fieldKey = fieldKey || this.config.fieldKey;
    return this.apiRequest<T>({ datasheetId, data: { records, fieldKey }, method: 'post' });
  }

  delRecords<T = boolean>(datasheetId: string, recordIds: string[]) {
    return this.apiRequest<T>({ datasheetId, params: { recordIds }, method: 'delete' });
  }

  upload<T = IAttachment>(datasheetId: string, file: any) {
    const form = new FormData();
    form.append('file', file, { contentType: 'multipart/form-data' });
    return this.apiRequest<T>({ apiName: 'attachments', datasheetId, data: form, method: 'post', headers: form.getHeaders() });
  }
}
