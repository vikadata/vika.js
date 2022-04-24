import { IGetFieldsListRespData } from '../interface';
import { Vika } from '../vika';
import { Datasheet } from './datasheet';

export class FieldManager {
  datasheet: Datasheet
  vika: Vika;
  constructor(datasheet: Datasheet) {
    this.datasheet = datasheet;
    this.vika = datasheet.vika;
  }

  get APIEndpoint() {
    return `/datasheets/${this.datasheet.datasheetId}/fields`;
  }
  /**
   * 获取字段列表
   */
  async list() {
    return await this.vika.request<IGetFieldsListRespData>({
      path: this.APIEndpoint,
      method: 'get',
    });
  }

  /**
   * 删除字段
   * @param fieldId 
   * @returns 
   */
  async delete(fieldId: string) {
    return await this.vika.request<IGetFieldsListRespData>({
      path: `/spaces/${this.datasheet.spaceId}/datasheets/${this.datasheet.datasheetId}/fields/${fieldId}`,
      method: 'delete',
    });
  }
}