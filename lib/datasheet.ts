import { Select } from './select';
import { Request, ISelectConfig } from './request';
import { IRecord } from './interface';

export class Datasheet {
  constructor(public datasheetId: string, private request: Request) {
  }

  select(config?: ISelectConfig) {
    return new Select(this.datasheetId, this.request, config);
  }

  async create(newRecords: IRecord[]) {
    return await this.request.createRecords(this.datasheetId, newRecords);
  }

  async find(records: string[]) {
    const result = await this.request.find(this.datasheetId, records);
    return result.data.data;
  }
}
