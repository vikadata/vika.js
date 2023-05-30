import { Datasheet } from './datasheet/datasheet';
import { IGetSpaceListResponseData } from './interface';
import { Vika } from './apitable';

export class SpaceManager {
  apitable: Vika
  spaceId: string

  constructor(apitable: Vika, spaceId = '') {
    this.apitable = apitable;
    this.spaceId = spaceId;
  }

  datasheet(datasheetId: string) {
    if (!this.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space for the operation.');
    }
    if (!datasheetId) {
      throw new Error(
        'Please pass the datasheet id, which can be retrieved from the datasheet url, ' + 
        'the datasheet id usually starts with dst, for example dstRzy7alM1mkuy1Y3'
      );
    }
    return new Datasheet(this.spaceId, datasheetId, this.apitable);
  }

  get datasheets() {
    return new Datasheet(this.spaceId, '', this.apitable);
  }

  /**
   * Get a list of user space.
   */
  async list<T = IGetSpaceListResponseData>() {
    return this.apitable.request<T>({
      path: `/spaces`,
      method: 'get',
    });
  }

}