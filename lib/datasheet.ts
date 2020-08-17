import { AxiosInstance } from 'axios';
import { Select } from './select';
import { Request, ISelectConfig } from './request';

export class Datasheet {
  constructor(public datasheetId: string, private request: Request) {
  }

  select(config?: ISelectConfig) {
    return new Select(this.datasheetId, this.request, config);
  }

  async find(records: string[]) {
    const result = await this.request.find(this.datasheetId, records);
    return result.data.data
  }
}
