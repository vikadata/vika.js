import { AxiosInstance } from 'axios';
import { Select, ISelectConfig } from './select';

export class Datasheet {
  constructor(public datasheetId: string, private axios: AxiosInstance) {
  }

  select(config?: ISelectConfig) {
    return new Select(this.datasheetId, this.axios, config);
  }

  find() {

  }
}
