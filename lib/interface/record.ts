export type IFieldValueBase = number | string | boolean | { [key: string]: any };

// Cell value Value type.
export type IFieldValue = IFieldValueBase | IFieldValueBase[] | null;

export type IFieldValueMap = { [fieldKey: string]: IFieldValue };

export interface IRecord {
  recordId: string;

  /**
   * Data in record,
   * the fieldId key of a column in data will be available only if there is content in that column of record.
   */
  fields: IFieldValueMap;
}


export interface ISortConfig { field: string, order: 'asc' | 'desc' }

export interface IGetRecordsReqParams {
  /**
   * (Optional) Specifies the total number of records returned per page, 
   * the default value is 100. this parameter only accepts integers from 1 to 1000.
   */
  pageSize?: number;
  /**
   * (Optional) Limits the total number of records returned. 
   * If the value is less than the actual total number of records in the datasheet, 
   * the datasheet number of records returned will be limited to that value.
   */
  maxRecords?: number;
  /**
   * (Optional) Specifies the page number of the pagination, default is 1, 
   * used in conjunction with the parameter pageSize.
   */
  pageNum?: number;
  /**
   * (Optional) Sorts the records in the specified datasheet. 
   * Arrays of multiple 'sort objects'. Supports order: 'asc' and 
   * reverse order: 'desc'. Note: The sort condition specified by 
   * this parameter will override the sort condition in the view.
   */
  sort?: ISortConfig[];
  /**
   * (Optional) An array of record IDs. If this parameter is attached, 
   * an array of records with the specified IDs is returned. 
   * The returned values are sorted in the order of the incoming array. 
   * Ignore filtering and sorting at this point. No paging, up to 1000 records per query.
   */
  recordIds?: string[];
  /**
   * (Optional) View ID. defaults to the first view in the datasheet. 
   * The request will return the results of the view after filtering/sorting in the view, 
   * you can use the fields parameter to filter the data of unwanted fields.
   */
  viewId?: string;
  /**
   * (Optional) Specifies the field to be returned (the default is the field name, 
   * which can also be specified as the field Id via fieldKey). If this parameter is included, 
   * the returned record set will be filtered and only the specified field will be returned.
   */
  fields?: string[];
  /**
   * (Optional) Use the formula as a filter condition to return matching records, 
   * access https://help.vika.cn/tutorial-getting-started-with-formulas/ understanding 
   * how the formula is used.
   */
  filterByFormula?: string;
  /**
   * (optional) cell value type, the default is 'json', 
   * specified as 'string' all values will be automatically converted to string format.
   */
  cellFormat?: 'json' | 'string';
  /**
   * (Optional) Specify the query and return key for the field. default is 
   * the column name 'name'. Specifying 'id' will use fieldId as the query and 
   * return method (using id will avoid code failure due to column name changes).
   */
  fieldKey?: 'name' | 'id';

  /**
   * use databus fusion api
   * */
  isV3: boolean;
}



export interface IPaginateInfo<T> {
  total: number;
  pageSize: number;
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