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
}


export interface ISortConfig { field: string, order: 'asc' | 'desc' }

export interface IGetRecordsReqParams {
  /**
   * （选填）指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数。
   */
  pageSize?: number;
  /**
   * （选填）限制返回记录的总数量。如果该值小于表中实际的记录总数，则返回的记录总数会被限制为该值。
   */
  maxRecords?: number;
  /**
   * （选填）指定分页的页码，默认为 1，与参数pageSize配合使用。
   */
  pageNum?: number;
  /**
   * （选填）对指定维格表的记录进行排序。由多个“排序对象”组成的数组。支持顺序：'asc' 和 逆序：'desc'。注：此参数指定的排序条件将会覆盖视图里的排序条件。
   */
  sort?: ISortConfig[];
  /**
   * （选填）记录ID数组。如果附带此参数，则返回指定IDs的记录数组。 返回值按照传入数组的顺序排序。此时无视筛选、排序。无分页，每次最多查询 1000 条
   */
  recordIds?: string[];
  /**
   * （选填）视图ID。默认为维格表中第一个视图。请求会返回视图中经过视图中筛选/排序后的结果，可以搭配使用fields参数过滤不需要的字段数据
   */
  viewId?: string;
  /**
   * （选填）指定要返回的字段（默认为字段名, 也可以通过 fieldKey 指定为字段 Id）。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回。
   */
  fields?: string[];
  /**
   * （选填）使用公式作为筛选条件，返回匹配的记录，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解公式使用方式
   */
  filterByFormula?: string;
  /**
   * （选填）单元格值类型，默认为 'json'，指定为 'string' 时所有值都将被自动转换为 string 格式。
   */
  cellFormat?: 'json' | 'string';
  /**
   * （选填）指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey?: 'name' | 'id';
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

export type IGetRecordsResponseData = IPaginateInfo<IRecord[]>;

export type ICreateRecordsReqParams = Omit<IRecord, 'recordId'>[];

export interface ICreateRecordsResponseData {
  records: IRecord[]
}
export type IUpdateRecordsResponseData = ICreateRecordsResponseData;

export type INewRecords = ICreateRecordsReqParams;