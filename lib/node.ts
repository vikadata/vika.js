import { IGetNodeListResponseData, IGetNodeListReqParams, IGetNodeDetailReqParams, IGetNodeDetailResponseData, ISearchNodeListReqParams, ISearchNodeListResponseData } from './interface';
import { Vika } from './apitable';

export class NodeManager {
  apitable: Vika

  constructor(apitable: Vika) {
    this.apitable = apitable;
  }
  /**
   * Get the list of root nodes of the specified space stations.
   * @param param0 
   */
  async list<T = IGetNodeListResponseData>(params: IGetNodeListReqParams) {
    return this.apitable.request<T>({
      path: `/spaces/${params.spaceId}/nodes`,
      method: 'get',
    });
  }
  /**
   * Get information about the specified node.
   */
  async get<T = IGetNodeDetailResponseData>(params: IGetNodeDetailReqParams) {
    return this.apitable.request<T>({
      path: `/spaces/${params.spaceId}/nodes/${params.nodeId}`,
      method: 'get',
    });
  }
  /**
   * Search Nodes.
   */
  async search<T = ISearchNodeListResponseData>(params: ISearchNodeListReqParams) {
    return this.apitable.request<T>({
      path: `/fusion/v2/spaces/${params.spaceId}/nodes`,
      method: 'get',
      params,
    });
  }
}