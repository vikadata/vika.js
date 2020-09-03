import { Request, IGetRecordsConfig } from './request';
import { IRecord, IHttpResponse, INewRecords } from './interface';
import { wait } from './utils';

export const MAX_RECORD_SIZE = 1000;
export const MIN_TIME_GAP = 200; // 最大并发量，1 秒 5 次请求

export class Datasheet {
  constructor(public datasheetId: string, private request: Request) {
  }

  async all(params?: Omit<IGetRecordsConfig, 'pageSize' | 'pageNum'>): Promise<IHttpResponse<{ records: IRecord[] }>> {
    const allRecords: IRecord[] = [];

    let pageNum = 0;

    while (true) {
      const timeBegin = Date.now();
      const result = await this.request.getRecords(this.datasheetId, {
        pageSize: MAX_RECORD_SIZE,
        pageNum: ++pageNum,
        ...params
      });
      const timeGap = Date.now() - timeBegin;

      if (timeGap < MIN_TIME_GAP) {
        await wait(MIN_TIME_GAP);
      }

      if (!result.success) {
        return result;
      }

      const { total, records } = result.data;

      allRecords.push(...records);

      if (total <= pageNum * MAX_RECORD_SIZE) {
        return {
          success: true,
          code: 200,
          message: '请求成功',
          data: { records: allRecords },
        };
      }
    }
  }

  async get(params?: IGetRecordsConfig) {
    return await this.request.getRecords(this.datasheetId, params);
  }

  async create(newRecords: INewRecords[], fieldKey?: 'name' | 'id') {
    return await this.request.createRecords(this.datasheetId, newRecords, fieldKey);
  }

  async find(records: string[], fieldKey?: 'name' | 'id') {
    return await this.request.findRecords(this.datasheetId, records, fieldKey);
  }

  async del(recordIds: string[]) {
    return await this.request.delRecords(this.datasheetId, recordIds);
  }
}
