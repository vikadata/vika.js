import { AxiosInstance } from 'axios';
import { IRecord, IHttpSuccessResponse, IRecordPage, IHttpErrorResponse } from './interface';

export interface ISortConfig { [fieldName: string]: 'asc' | 'desc' }

export interface ISelectConfig {
  viewId?: string; // 视图ID。如果附带此参数，则只返回经过视图筛选和排序后的记录合集
  fields?: string[]; // 指定要返回的字段。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回
  maxRecords?: number; // 指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数
  pageSize?: number; // 指定每页返回的记录总数，缺省值为100。此参数只接受1-1000的整数
  sort?: ISortConfig[];
  filterByFormula?: string; // 筛选公式计算返回为 true 的内容，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解更多
}

export type ISuccessCb = (records: IRecord[], fetchNextPage: () => void) => void;

export type IDoneCb = (error?: IHttpErrorResponse) => void;

export class Select {
  constructor(public datasheetId: string, private axios: AxiosInstance, public config: ISelectConfig = {}) {
  }

  eachPage(successCb: ISuccessCb, doneCb: IDoneCb) {
    const { axios, datasheetId, config } = this;
    let pageNum = 1;

    const fetchNextPage = () => {
      axios.request<IHttpSuccessResponse<IRecordPage>>({
        url: `/datasheets/${datasheetId}/records`,
        method: 'get',
        params: Object.assign<ISelectConfig & { pageNum: number }, ISelectConfig>({
          pageSize: 100,
          pageNum: pageNum++,
        }, config),
      }).then(result => {
        if (!result.data.success) {
          doneCb(result.data);
          return;
        }

        const { total, pageNum, pageSize, records } = result.data.data;
        const hasDone = total > pageNum * pageSize;
        successCb(records, hasDone ? () => { } : fetchNextPage);
        hasDone && doneCb();
      }).catch(err => {
        doneCb(err);
      })
    }

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

  async all(): Promise<IRecord[] | IHttpErrorResponse> {
    return new Promise((resolve, reject) => {
      const records: IRecord[] = [];
      this.eachPage(pageRecords => {
        records.push(...pageRecords);
      }, err => {
        if (err) {
          reject(err);
        } else {
          resolve(records)
        }
      });
    })
  }
}
