import { Request, ISelectConfig } from './request';
import { IRecord } from './interface';
import { wait } from './utils';

const MAX_RECORD_SIZE = 1000;
const MIN_TIME_GAP = 200; // 最大并发量，1 秒 5 次请求

export class Datasheet {
  constructor(public datasheetId: string, private request: Request) {
  }

  async all(params?: Omit<ISelectConfig, 'pageSize' | 'pageNum'>) {
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

      console.log('time coast', timeGap);
      if (timeGap < MIN_TIME_GAP) {
        await wait(MIN_TIME_GAP);
      }

      const { total, records } = result.data.data;

      allRecords.push(...records);

      if (total <= pageNum * MAX_RECORD_SIZE) {
        return allRecords;
      }
    }
  }

  async get(params?: ISelectConfig) {
    return await this.request.getRecords(this.datasheetId, params);
  }

  async create(newRecords: IRecord[], fieldKey?: 'name' | 'id') {
    return await this.request.createRecords(this.datasheetId, newRecords, fieldKey);
  }

  async find(records: string[], fieldKey?: 'name' | 'id') {
    const result = await this.request.findRecords(this.datasheetId, records, fieldKey);
    return result.data.data;
  }

  async del(recordIds: string[]) {
    return await this.request.delRecords(this.datasheetId, recordIds);
  }
}
