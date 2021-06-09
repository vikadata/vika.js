import { IGetViewsListRespData } from '../interface/view';
import { Vika } from '../vika';
import { Datasheet } from './datasheet';

export class ViewManager {
  datasheet: Datasheet
  vika: Vika;

  constructor(datasheet: Datasheet) {
    this.datasheet = datasheet;
    this.vika = datasheet.vika;
  }

  get APIEndpoint() {
    return `/datasheets/${this.datasheet.datasheetId}/views`;
  }
  /**
   * 
   */
  async list() {
    return await this.vika.request<IGetViewsListRespData>({
      path: this.APIEndpoint,
      method: 'get',
    });
  }
}