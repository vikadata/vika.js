import { FieldType } from '../enums';
import { IFieldProperty } from './field.property';

/**
 * 字段相关
 */
export interface IField {
  id: string;
  name: string;
  type: FieldType;
  isPrimary?: boolean;
  desc?: string;
  property?: IFieldProperty;
  permissionLevel?: 'edit' | 'read';
}

export interface IGetFieldsListRespData {
  fields: IField[];
}
