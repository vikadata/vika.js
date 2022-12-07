import { RollUpFuncType } from '../enums';
import { IField } from './field';
/**
 * Field property.
 */
export interface ISingleTextFieldFieldProperty {
  defaultValue?: string;
}
export interface INumberFieldProperty {
  defaultValue?: string;
  precision: number;
}
export interface ICurrencyFieldProperty {
  defaultValue?: string;
  precision: number;
  symbol: string;
}
export interface IPercentFieldProperty {
  defaultValue?: string;
  precision: number;
}

export interface ISelectOption {
  id: string;
  name: string;
  color: {
    name: string;
    value: string;
  }
}
export interface ISingleSelectFieldProperty {
  options?: ISelectOption[];
}

export type IMultiSelectFieldProperty = ISingleSelectFieldProperty;

export interface IMember {
  id: string;
  name: string;
  type: 'member' | 'team';
  avatar?: string;
}
export interface IMemberFieldProperty {
  options?: IMember[];
  isMulti?: boolean;
  shouldSendMsg?: boolean;
}

export interface IUser {
  id: string | 'Anonymous' | 'Bot';
  name: string;
  avatar: string;
}

export interface ICreateByFieldProperty {
  options?: IUser[];
}

export interface ILastModifiedByFieldProperty {
  options?: IUser[];
}

export interface ICheckboxFieldProperty {
  icon: string;
}

export interface IRatingFieldProperty {
  icon: string;
  max: number;
}

export interface IDateTimeFieldProperty {
  format: string;
  autoFill: boolean;
  includeTime: boolean;
}


export type ICreatedTimeFieldProperty = IDateTimeFieldProperty;

export type ILastModifiedTimeFieldProperty = IDateTimeFieldProperty;

export interface IMagicLinkFieldProperty {
  foreignDatasheetId: string;
  brotherFieldId: string;
  limitToViewId?: string;
  limitSingleRecord?: boolean;
}

export interface IFieldWithDatasheetId {
  datasheetId: string;
  field: IField;
}
export type ValueType = 'string' | 'boolean' | 'number' | 'datetime' | 'array'


export interface IDateTimeFormat {
  dateFormat: string;
  timeFormat: string;
  includeTime: boolean;
}
export interface INumberFormat {
  precision: number;
}

export type IPercentFormat = INumberFormat;

export interface ICurrencyFormat {
  precision: number;
  symbol?: string;
}

export type IFormat = IDateTimeFormat | INumberFormat | IPercentFormat | ICurrencyFormat;

export interface IDateTimeFormat {
  dateFormat: string;
  timeFormat: string;
  includeTime: boolean;
}

export interface INoneStringValueFormat {
  type: 'datetime' | 'number' | 'percent' | 'currency';
  format: IFormat;
}

export interface IMagicLookupFieldProperty {
  relatedLinkFieldId: string;
  targetFieldId: string;
  hasError?: boolean;
  entityField?: IFieldWithDatasheetId;
  rollupFunction?: RollUpFuncType;
  valueType: ValueType;
  format?: INoneStringValueFormat;
}

export interface IFormulaFieldProperty {
  expression: string;
  valueType: ValueType;
  hasError?: boolean;
  format?: INoneStringValueFormat;
}


export type IFieldProperty = ISingleTextFieldFieldProperty
  | INumberFieldProperty
  | ICurrencyFieldProperty
  | IPercentFieldProperty
  | ISingleSelectFieldProperty
  | IMultiSelectFieldProperty
  | IMemberFieldProperty
  | ICreateByFieldProperty
  | ILastModifiedByFieldProperty
  | ICheckboxFieldProperty
  | IRatingFieldProperty
  | IDateTimeFieldProperty
  | ICreatedTimeFieldProperty
  | ILastModifiedTimeFieldProperty
  | IMagicLinkFieldProperty
  | IMagicLookupFieldProperty
  | IFormulaFieldProperty
