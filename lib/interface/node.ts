export interface INodeItem {
  id: string;
  name: string;
  type: NodeType,
  icon: string;
  isFav: boolean;
}

export const enum NodeType {
  'Datasheet',
  'Mirror',
  'Folder',
  'Form',
  'Dashboard'
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
export interface ISearchNodeListReqParams {
  spaceId: string;
  type: NodeType;
  permissions?: number[];
  query?: string;
}
export type ISearchNodeListResponseData = {
  nodes: ISearchNodeDetail[]
}
export interface ISearchNodeDetail extends INodeItem {
  parentId?: string;
  permission: number;
}