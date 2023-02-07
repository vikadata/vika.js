export enum FieldType {
  // NotSupport = 'NotSupport',
  Text = 'Text',
  Number = 'Number',
  SingleSelect = 'SingleSelect',
  MultiSelect = 'MultiSelect',
  DateTime = 'DateTime',
  Attachment = 'Attachment',
  MagicLink = 'MagicLink',
  URL = 'URL',
  Email = 'Email',
  Phone = 'Phone',
  Checkbox = 'Checkbox',
  Rating = 'Rating',
  Member = 'Member',
  MagicLookUp = 'MagicLookUp',
  // RollUp = 'RollUp',
  Formula = 'Formula',
  Currency = 'Currency',
  Percent = 'Percent',
  SingleText = 'SingleText',
  AutoNumber = 'AutoNumber',
  CreatedTime = 'CreatedTime',
  LastModifiedTime = 'LastModifiedTime',
  CreatedBy = 'CreatedBy',
  LastModifiedBy = 'LastModifiedBy',
}

export enum RollUpFuncType {
  VALUES = 'VALUES',
  AVERAGE = 'AVERAGE',
  COUNT = 'COUNT',
  COUNTA = 'COUNTA',
  COUNTALL = 'COUNTALL',
  SUM = 'SUM',
  MIN = 'MIN',
  MAX = 'MAX',
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
  CONCATENATE = 'CONCATENATE',
  ARRAYJOIN = 'ARRAYJOIN',
  ARRAYUNIQUE = 'ARRAYUNIQUE',
  ARRAYCOMPACT = 'ARRAYCOMPACT',
}

export enum ViewType {
  Grid = 'Grid',
  Gallery = 'Gallery',
  Kanban = 'Kanban',
  Gantt = 'Gantt',
}

export enum TSymbolAlign {
  Default = 'Default',
  Left = 'Left',
  Right = 'Right'
}

export enum Conversion {
  /** Delete associated fields from related datasheet. */
  Delete = 'delete',
  /** Keep the associated fields of the associated datasheet and convert them to text type. */
  KeepText = 'keepText'
}

export enum APIMetaFieldPropertyFormatEnums {
  DateTime = 'DateTime',
  Number = 'Number',
  Percent = 'Percent',
  Currency = 'Currency',
}

export enum IframeMessageName {
  Collaborators = "collaborators",
  SocketStatus = "socketStatus",
  SocketError = "socketError",
  ChangeView = "changeView",
  ChangeNodeName = 'changeNodeName'
}

export enum Network {
  Online = "online",
  Offline = "offline",
  Sync = "sync",
  Loading = "loading"
}
