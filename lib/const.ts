import { LogLevel } from "./logging";

export const MAX_RECORD_SIZE = 1000;
export const QPS = 5;
export const MIN_TIME_GAP = 1000 / QPS; // 最大并发量，1 秒 5 次请求
export const DST_MAX_RECORDS = 50000; // 单表最大记录数量
export const DEFAULT_HOST = 'https://api.vika.cn/fusion/v1';
export const DEFAULT_REQUEST_TIMEOUT = 60000;
export const MAX_WRITE_SIZE_PER_REQ = 10;

export const LOG_LEVEL_WEIGHT_MAP = {
  [LogLevel.DEBUG]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.WARN]: 3,
  [LogLevel.ERROR]: 4,
};