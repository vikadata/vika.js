import { IRecord, IHttpErrorResponse } from './interface';
import { Request, ISelectConfig } from './request';

export type ISuccessCb = (records: IRecord[], fetchNextPage: () => void) => void;

export type IDoneCb = (error?: IHttpErrorResponse) => void;

const DEFAULT_PAGE_SIZE = 100;

export class Select {
  constructor(public datasheetId: string, private request: Request, public config: ISelectConfig = {}) {
  }

  private getEachPageFn(config: ISelectConfig) {
    return (successCb: ISuccessCb, doneCb: IDoneCb) => {
      let pageNum = 1;

      const fetchNextPage = () => {
        const params = Object.assign<ISelectConfig, ISelectConfig>({
          pageSize: DEFAULT_PAGE_SIZE,
          pageNum: pageNum++,
        }, config);

        this.request.records(this.datasheetId, params).then(result => {
          if (!result.data.success) {
            doneCb(result.data);
            return;
          }

          const { total, pageNum, pageSize, records } = result.data.data;
          const hasDone = total > pageNum * pageSize;

          // 页面加载完毕后，返回空的 nextPage 函数，防止越界调用
          successCb(records, hasDone ? () => { return; } : fetchNextPage);
          hasDone && doneCb();
        }).catch(err => {
          doneCb(err);
        });
      };

      fetchNextPage();
    };
  }

  eachPage(successCb: ISuccessCb, doneCb: IDoneCb) {
    return this.getEachPageFn(this.config)(successCb, doneCb);
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

  async all(): Promise<IRecord[] | IHttpErrorResponse> {
    return new Promise((resolve, reject) => {
      const records: IRecord[] = [];
      // 加载全部数据时，以最大 pageSize 进行请求
      this.getEachPageFn({ ...this.config, pageSize: 1000 })(pageRecords => {
        records.push(...pageRecords);
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
