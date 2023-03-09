import { IframeMessageName, Network, TriggerIframeMessageName } from '../enums';

export type IEventFunc = (data: any) => void;

export interface IIframeMessageForCollaborators {
  message: IframeMessageName.Collaborators;
  data: {
    roomId: string;
    collaborators: ICollaborator[];
  };
}

interface ICollaborator {
  name: string;
  avatar: string;
}

export interface IIframeMessageForSocketStatus {
  message: IframeMessageName.SocketStatus;
  data: {
    roomId: string;
    status: Network;
  };
}

export interface IIframeMessageForSocketError {
  message: IframeMessageName.SocketError;
  data: IRoomSocketError;
}

interface IRoomSocketError {
  errorCode: number;
  message: string;
  roomId: string;
  messageId: string;
}

export interface IIframeMessageForChangeView {
  message: IframeMessageName.ChangeView;
  data: {
    roomId: string;
    nextViewId: string;
  };
}

export interface IIframeMessageForChangeNodeName {
  message: IframeMessageName.ChangeNodeName;
  data: {
    roomId: string;
    nodeName: string;
  };
}

export interface IIframeMessageForPageLoaded {
  message: IframeMessageName.PageLoaded;
}

export interface IIframeMessageForEmbedLinkFail {
  message: IframeMessageName.EmbedLinkFail;
}

export interface IIframeMessageForPageCrash {
  message: IframeMessageName.PageCrash;
}

export interface IIframeMessageForChangeViewName {
  message: IframeMessageName.ChangeViewName;
  data: {
    roomId: string;
    viewId: string;
    viewName: string;
  };
}

export interface IIframeMessageForTriggerEventResult {
  message: IframeMessageName.TriggerEventResult;
  data: {
    eventName: TriggerIframeMessageName;
    success: boolean;
    message?: string;
  };
}

interface ITriggerIframeMessageBase {
  iframeRef: any;
  eventName: TriggerIframeMessageName;
}

export interface ITriggerIframeMessageForExportData extends ITriggerIframeMessageBase {
  eventName: TriggerIframeMessageName.ExportData;
  data: {
    nodeId: string;
    viewId?: string
  };
}

export type ITriggerIframeMessage = ITriggerIframeMessageForExportData
