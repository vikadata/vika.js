import { IGetViewsListRespData } from '../interface/view';
import { Vika } from '../apitable';
import { Datasheet } from './datasheet';

export class ViewManager {
  datasheet: Datasheet
  apitable: Vika;

  constructor(datasheet: Datasheet) {
    this.datasheet = datasheet;
    this.apitable = datasheet.apitable;
  }

  get APIEndpoint() {
    return `/datasheets/${this.datasheet.datasheetId}/views`;
  }
  /**
   * 
   */
  async list() {
    return await this.apitable.request<IGetViewsListRespData>({
      path: this.APIEndpoint,
      method: 'get',
    });
  }
}