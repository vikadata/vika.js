import { IGetSpaceListResponseData } from './interface';
import { Vika } from './vika';

export class SpaceManager {
  vika: Vika

  constructor(vika: Vika) {
    this.vika = vika;
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