export * from './field';
export * from './record';
export * from './node';
export * from './view';
export * from './space';
export * from './datasheet.create.ro';

/**
 * 附件类型
 */
export interface IAttachment {
  token: string; // 附件访问路径
  name: string; // 附件原始名称
  size: number; // 附件大小
  width: number; // 附件宽
  height: number; // 附件长
  mimeType: string; // 附件类型
  bucket: string; // 上传位置
  preview?: string; // 预览图
}


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


export interface IVikaClientConfig {
  /**
   * API Token
   */
  token: string;
  /**
   * 指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey?: 'name' | 'id';
  /**
   * 请求失效时间，默认 60000ms (10 秒)
   */
  requestTimeout?: number;
  /**
   * 目标服务器地址
   */
  host?: string;
  /**
   * log 等级
   */
  logLevel?: 'Error' | 'Warn' | 'Log' | 'Debug'
  /**
   * 禁用 SDK 自定义 user-agent，为了统计 API 使用情况而收集的请求头信息。在某些浏览器安全策略、环境下，不允许修改 user-agent，你可以主动关闭这个功能。
   */
  disableClientUserAgent?: boolean;

  /**
   * 如果需要在微信小程序中使用，需要添加请求适配器
   */
  adapter?: any;
}

