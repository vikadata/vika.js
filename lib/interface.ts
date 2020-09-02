export type IFieldValueBase = number | string | boolean | { [key: string]: any };

// 单元格 value 值类型
export type IFieldValue = IFieldValueBase | IFieldValueBase[] | null;

export type IFieldValueMap = { [fieldKey: string]: IFieldValue };

export interface IRecord {
  recordId: string;

  /**
   * record 中的数据
   * 只有当 record 某一列存在内容时，data 中才会有这一列的fieldId key
   */
  fields: IFieldValueMap;

  createdAt: number;
}

/**
 *  将要新创建的 records
 */
export type INewRecords = Pick<IRecord, 'fields'>;

/**
 * 创建/更新 records 的返回结果
 */
export interface IRecordsResult {
  records: IRecord[];
}

export interface IDeletedRecord {
  recordId: string,
  deleted: true
}

export interface IPaginateInfo<T> {
  // 总记录条数
  total: number;
  // 每页返回的记录总数
  pageSize: number;
  // 分页的页码
  pageNum: number;

  records: T;
}

export type IRecordPage = IPaginateInfo<IRecord[]>;

export type IFindRecords = { records: IRecord[] };

// HTTP 成功响应
export interface IHttpSuccessResponse<T> {
  success: true;
  code: number;
  message: string;
  data: T;
}

export interface IHttpErrorResponse<T> {
  success: false;
  code: number;
  message: string;
  data?: T;
}

export type IHttpResponse<T = any> = IHttpSuccessResponse<T> | IHttpErrorResponse<T>;
