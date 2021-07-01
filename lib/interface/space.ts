export interface ISpaceItem {
  id: string;
  name: string;
  isAdmin?: boolean;
}

export type IGetSpaceListResponseData = {
  spaces: ISpaceItem[]
}