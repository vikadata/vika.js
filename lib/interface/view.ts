import { ViewType } from '../enums';

/**
 * 视图相关
 */
export interface IView {
  id: string;
  name: string;
  type: ViewType;
}

export interface IGetViewsListRespData {
  views: IView[];
}
