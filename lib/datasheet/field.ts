import { IGetFieldsListRespData } from '../interface';
import { IDatasheetFieldCreateRo } from '../interface/datasheet.field.create.ro';
import { IDatasheetFieldCreateVo } from '../interface/datasheet.field.create.vo';
import { Vika } from '../apitable';
import { Datasheet } from './datasheet';

export class FieldManager {
  datasheet: Datasheet
  apitable: Vika;
  constructor(datasheet: Datasheet) {
    this.datasheet = datasheet;
    this.apitable = datasheet.apitable;
  }

  get APIEndpoint() {
    return `/datasheets/${this.datasheet.datasheetId}/fields`;
  }
  /**
   * Get a list of fields.
   */
  async list() {
    return await this.apitable.request<IGetFieldsListRespData>({
      path: this.APIEndpoint,
      method: 'get',
    });
  }

  /**
   * Create field.
   */
   async create(fieldCreateRo: IDatasheetFieldCreateRo){
    if (!this.datasheet.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space for the operation.');
    }
    return await this.apitable.request<IDatasheetFieldCreateVo>({
      path: `/spaces/${this.datasheet.spaceId}/datasheets/${this.datasheet.datasheetId}/fields`,
      method: 'post',
      data: fieldCreateRo
    });
  }

  /**
   * Delete field.
   * @param fieldId 
   * @returns 
   */
  async delete(fieldId: string) {
    return await this.apitable.request<IGetFieldsListRespData>({
      path: `/spaces/${this.datasheet.spaceId}/datasheets/${this.datasheet.datasheetId}/fields/${fieldId}`,
      method: 'delete',
    });
  }
}