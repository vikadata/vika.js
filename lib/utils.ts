import { AxiosRequestConfig } from 'axios';
import { DEFAULT_HOST, DEFAULT_REQUEST_TIMEOUT } from "./const";
import { IVikaClientConfig } from "./interface";
import { Vika } from './apitable';

declare const window: any;

export const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
};

export const chunks = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};


// export const mergeDefaultQueryParams = (params?: IGetRecordsReqParams) => {
//   const defaultParams = {
//     pageSize: 100,
//     pageNum: 1,
//   };
//   return { ...defaultParams, ...params };
// };

export const getResourceId = (url?: string) => {
  if (!url) return null;
  const urlPaths = url.split('/');
  const dstIndex = urlPaths.findIndex(i => i === 'datasheets');
  if (dstIndex > -1 && urlPaths.length > dstIndex) {
    return urlPaths[dstIndex + 1];
  }
  return null;
};

// https://www.jianshu.com/p/d3529d18cf59
export const QPSController = (QPS = 5, OFFSET = 50) => async (config: AxiosRequestConfig) => {
  // The QPS limit is a server-side limit on individual resources.
  const resourceId = getResourceId(config.url);
  if (!resourceId) return config;

  const now = new Date().getTime();
  let { count, lastReqTimestamp } = Vika.QPSMap.get(resourceId) || {
    count: 1,
    lastReqTimestamp: now
  };

  if (Math.floor(now / 1000) <= Math.floor(lastReqTimestamp / 1000)) {
    if (count < QPS) {
      count++;
    } else {
      lastReqTimestamp = 1000 * (Math.floor(lastReqTimestamp / 1000) + 1);
      count = 1;
    }
  } else {
    lastReqTimestamp = now;
    count = 1;
  }

  Vika.QPSMap.set(resourceId, {
    count,
    lastReqTimestamp
  });

  let sleep = lastReqTimestamp - now;
  sleep = sleep > 0 ? sleep + OFFSET : 0;
  await wait(sleep);
  return config;
};

export const mergeConfig = (config: IVikaClientConfig): IVikaClientConfig => {
  const DEFAULT_CONFIG: Omit<IVikaClientConfig, 'token'> = {
    host: DEFAULT_HOST,
    fieldKey: 'name',
    requestTimeout: DEFAULT_REQUEST_TIMEOUT,
    logLevel: 'Warn',
    disableClientUserAgent: false,
  };
  return { ...DEFAULT_CONFIG, ...config };
};

export const isBrowser = typeof window !== 'undefined';