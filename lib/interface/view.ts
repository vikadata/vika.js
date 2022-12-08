import { ViewType } from '../enums';

/**
 * View interface
 */
export interface IView {
  id: string;
  name: string;
  type: ViewType;
}

export interface IGetViewsListRespData {
  views: IView[];
}
