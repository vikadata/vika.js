export interface IEmbedInfo {
  primarySideBar?: {
    collapsed?: boolean;
  },
  viewControl?: {
    viewId?: string;
    tabBar?: boolean;
    toolBar: {
      basicTools?: boolean;
      shareBtn?: boolean;
      widgetBtn?: boolean;
      apiBtn?: boolean;
      formBtn?: boolean;
      historyBtn?: boolean;
      robotBtn?: boolean;
    },
  },
  bannerLogo?: boolean,
  permissionType?: PermissionType
}

export enum PermissionType {
  READONLY = 'readOnly',
  PUBLICEDIT = 'publicEdit',
  PRIVATEEDIT = 'privateEdit'
}

export enum EmbedLinkTheme {
  Light = 'light',
  Dark = 'dark',
}

export interface IEmbedLinkCreateRo {
  payload?: IEmbedInfo;
  theme?: EmbedLinkTheme;
}

export interface IEmbedLinkCreateVo {
  payload?: IEmbedInfo;
  theme?: EmbedLinkTheme;
  linkId: string;
  url: string;
}