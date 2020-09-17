import { Datasheet } from './datasheet';
import { Request, IAuthConfig } from './request';

export class Vika {
  static config: IAuthConfig;
  static request: Request;

  static auth(config: IAuthConfig) {
    if (!config) {
      throw new Error('请传入 API Token。(登陆 vika.cn 在左下角用户中心获取)');
    }

    this.config = config;
    this.request = new Request(config);
    return Vika;
  }

  static datasheet(datasheetId: string) {
    if (!datasheetId) {
      throw new Error('请传入维格表Id, 可以从维格表 url 上获取，维格表 id 通常以 dst 开头');
    }

    return new Datasheet(datasheetId, this.request);
  }
}
