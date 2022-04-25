import { Datasheet } from './datasheet/datasheet';
import { IGetSpaceListResponseData } from './interface';
import { Vika } from './vika';

export class SpaceManager {
  vika: Vika
  spaceId: string

  constructor(vika: Vika, spaceId = '') {
    this.vika = vika;
    this.spaceId = spaceId;
  }

  datasheet(datasheetId: string) {
    if (!this.spaceId) {
      throw new Error('请在构建space对象时输入spaceId参数，以确定操作的空间站');
    }
    if (!datasheetId) {
      throw new Error('请传入维格表Id, 可以从维格表 url 上获取，维格表 id 通常以 dst 开头');
    }
    return new Datasheet(this.spaceId, datasheetId, this.vika);
  }

  get datasheets() {
    return new Datasheet(this.spaceId, '', this.vika);
  }

  /**
   * 获取用户空间站列表
   */
  async list<T = IGetSpaceListResponseData>() {
    return this.vika.request<T>({
      path: `/spaces`,
      method: 'get',
    });
  }

}