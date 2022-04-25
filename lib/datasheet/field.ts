import { IGetFieldsListRespData } from '../interface';
import { IDatasheetFieldCreateRo } from '../interface/datasheet.field.create.ro';
import { IDatasheetFieldCreateVo } from '../interface/datasheet.field.create.vo';
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
   * 创建字段
   */
   async create(fieldCreateRo: IDatasheetFieldCreateRo){
    if (!this.datasheet.spaceId) {
      throw new Error('请在构建space对象时输入spaceId参数，以确定操作的空间站');
    }
    return await this.vika.request<IDatasheetFieldCreateVo>({
      path: `/spaces/${this.datasheet.spaceId}/datasheets/${this.datasheet.datasheetId}/fields`,
      method: 'post',
      data: fieldCreateRo
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