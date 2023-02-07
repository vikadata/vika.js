import { IframeMessageName, Network } from '../enums';

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
