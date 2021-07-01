import { IGetNodeListResponseData, IGetNodeListReqParams, IGetNodeDetailReqParams, IGetNodeDetailResponseData } from './interface';
import { Vika } from './vika';

export class NodeManager {
  vika: Vika

  constructor(vika: Vika) {
    this.vika = vika;
  }
  /**
   * 获取指定空间站的根目录节点列表
   * @param param0 
   */
  async list<T = IGetNodeListResponseData>(params: IGetNodeListReqParams) {
    return this.vika.request<T>({
      path: `/spaces/${params.spaceId}/nodes`,
      method: 'get',
    });
  }
  /**
   * 获取指定节点信息
   */
  async get<T = IGetNodeDetailResponseData>(params: IGetNodeDetailReqParams) {
    return this.vika.request<T>({
      path: `/spaces/${params.spaceId}/nodes/${params.nodeId}`,
      method: 'get',
    });
  }
}