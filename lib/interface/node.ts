export interface INodeItem {
  id: string;
  name: string;
  type: 'datasheet' | 'folder';
  icon: string;
  isFav: boolean;
}

export interface IGetNodeListReqParams {
  spaceId: string
}
export type IGetNodeListResponseData = {
  nodes: INodeItem[]
}

export interface IGetNodeDetailReqParams {
  spaceId: string
  nodeId: string
}

export interface IGetNodeDetailResponseData extends INodeItem {
  children?: INodeItem[];
}