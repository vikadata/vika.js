import { MAX_RECORD_SIZE } from '../const';
import {
  ICreateRecordsReqParams, ICreateRecordsResponseData,
  IGetRecordsReqParams, IGetRecordsResponseData, IRecord
} from '../interface';
import { Vika } from '../apitable';
import { Datasheet } from './datasheet';

export class RecordManager {
  datasheet: Datasheet
  datasheetId: string;
  apitable: Vika;

  constructor(datasheet: Datasheet) {
    this.datasheet = datasheet;
    this.datasheetId = datasheet.datasheetId;
    this.apitable = datasheet.apitable;
  }

  get APIEndpoint() {
    return `/datasheets/${this.datasheetId}/records`;
  }
  /**
   * Automatically handles paging and returns recordsets by batch.
   * for await (let eachPageRecords of dst.records.queryAll()){
   *    console.log(eachPageRecords)
   * }
   * @param params 
   */
  async *queryAll(params?: Omit<IGetRecordsReqParams, 'pageSize' | 'pageNum'>) {
    let pageNum = 0;
    let total = 0;

    do {
      const result = await this.apitable.request<IGetRecordsResponseData>({
        path: this.APIEndpoint,
        params: {
          pageSize: MAX_RECORD_SIZE,
          pageNum: ++pageNum,
          ...params,
        },
        method: 'get',
      });
      if (!result.success) {
        throw Error(result.message);
      }
      total = result.data.total;
      yield result.data.records;
    } while (MAX_RECORD_SIZE * pageNum <= total);
  }

  async query(params?: IGetRecordsReqParams) {
    return await this.apitable.request<IGetRecordsResponseData>({
      path: this.APIEndpoint,
      params: params,
      method: 'get',
    });
  }

  async get(recordIds: string | string[]) {
    const _recordIds = Array.isArray(recordIds) ? recordIds : [recordIds];
    if (!_recordIds.length) throw new TypeError('recordIds cant be empty');
    return await this.apitable.request<IGetRecordsResponseData>({
      path: this.APIEndpoint,
      params: {
        recordIds: _recordIds,
      },
      method: 'get',
    });
  }

  async create(newRecords: ICreateRecordsReqParams, fieldKey = this.apitable.config.fieldKey) {
    return await this.apitable.request<ICreateRecordsResponseData>({
      path: this.APIEndpoint,
      params: {
        fieldKey,
      },
      method: 'post',
      data: {
        records: newRecords,
        fieldKey,
      },
    });
  }

  async update(records: IRecord[], fieldKey = this.apitable.config.fieldKey) {
    if (!records.length) throw new TypeError('records cant be empty');
    return await this.apitable.request<ICreateRecordsResponseData>({
      path: this.APIEndpoint,
      params: {
        fieldKey
      },
      method: 'patch',
      data: {
        records,
        fieldKey,
      },
    });
  }

  async delete(recordIds: string | string[]) {
    const _recordIds = Array.isArray(recordIds) ? recordIds : [recordIds];
    return await this.apitable.request({
      path: this.APIEndpoint,
      params: {
        recordIds: _recordIds,
      },
      method: 'delete',
    });
  }
}