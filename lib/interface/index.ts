export * from './field';
export * from './record';
export * from './node';
export * from './view';
export * from './space';
export * from './datasheet.create.ro';

/**
 * Attachment interface.
 */
export interface IAttachment {
  token: string; // Attachment Access Path.
  name: string; // Original name of the attachment.
  size: number;
  width: number;
  height: number;
  mimeType: string; // Attachment type.
  bucket: string; // Upload Location.
  preview?: string; // Preview image.
  url?: string; // Attachment link
}


// HTTP successful response.
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
   * The default is the column name 'name'. Specifying 'id' will use fieldId as the query and 
   * return method (using id will avoid code failure due to column name changes).
   */
  fieldKey?: 'name' | 'id';
  /**
   * Request expiration time, default 60000ms (10 seconds).
   */
  requestTimeout?: number;
  /**
   * Destination server address.
   */
  host?: string;
  /**
   * Log Level.
   */
  logLevel?: 'Error' | 'Warn' | 'Log' | 'Debug'
  /**
   * Disable the SDK custom user-agent, request header information collected for 
   * API usage statistics. In some browser security policies, 
   * environments that do not allow user-agent modification, 
   * you can actively disable this feature.
   */
  disableClientUserAgent?: boolean;

  /**
   * If you need to use it in WeChat applet, you need to add request adapter.
   */
  adapter?: any;
}

