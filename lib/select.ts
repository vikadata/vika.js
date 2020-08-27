import { IRecord, IHttpErrorResponse } from './interface';
import { Request, ISelectConfig } from './request';

export type ISuccessCb = (records: IRecord[], fetchNextPage: () => void) => void;

export type IDoneCb = (error?: IHttpErrorResponse) => void;

const DEFAULT_PAGE_SIZE = 1000;

export class Select {
  constructor(public datasheetId: string, private request: Request, public config: ISelectConfig = {}) {
  }

  eachPage(successCb: ISuccessCb, doneCb: IDoneCb) {
    let pageNum = 1;

    const fetchNextPage = () => {
      const params = Object.assign<ISelectConfig, ISelectConfig>({
        pageSize: DEFAULT_PAGE_SIZE,
        pageNum: pageNum++,
      }, this.config);

      this.request.getRecords(this.datasheetId, params).then(result => {
        if (!result.data.success) {
          doneCb(result.data);
          return;
        }

        const { total, pageNum, records } = result.data.data;
        const hasDone = total <= pageNum * params.pageSize!;

        // 页面加载完毕后，返回空的 nextPage 函数，防止越界调用
        successCb(records, hasDone ? () => { return; } : fetchNextPage);
        hasDone && doneCb();
      }).catch(err => {
        doneCb(err.response.data || {
          success: false,
          code: 500,
          message: '服务器异常'
        });
      });
    };

    fetchNextPage();
  }

  async firstPage() {
    return new Promise((resolve, reject) => {
      this.eachPage(records => {
        resolve(records);
      }, err => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  async all(): Promise<IRecord[]> {
    return new Promise((resolve, reject) => {
      const records: IRecord[] = [];
      this.config.pageSize = 50;
      // 加载全部数据时，以最大 pageSize 进行请求
      this.eachPage((pageRecords, next) => {
        records.push(...pageRecords);
        next();
      }, err => {
        if (err) {
          reject(err);
        } else {
          resolve(records);
        }
      });
    });
  }
}
