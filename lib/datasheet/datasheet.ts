import FormData from 'form-data';
import { DEFAULT_REQUEST_TIMEOUT } from '../const';
import { IAttachment } from '../interface';
import { Vika } from '../vika';
import { FieldManager } from './field';
import { RecordManager } from './record';
import { ViewManager } from './view';


export class Datasheet {
  vika: Vika

  constructor(public datasheetId: string, vika: Vika) {
    this.vika = vika;
    this.datasheetId = datasheetId;
  }

  get fields() {
    return new FieldManager(this);
  }

  get views() {
    return new ViewManager(this);
  }

  get records() {
    return new RecordManager(this);
  }

  /**
   * 上传文件
   * @param file 
   * @returns 
   */
  async upload(file: any, options?: FormData.AppendOptions) {
    // 每次只允许上传一个文件
    if (Array.isArray(file)) {
      file = file[0];
    }
    const form = new FormData();
    form.append('file', file, options);
    return await this.vika.request<IAttachment>({
      path: `/datasheets/${this.datasheetId}/attachments`,
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(form.getHeaders ? form.getHeaders() : {}),
      },
      timeout: this.vika.config.requestTimeout || DEFAULT_REQUEST_TIMEOUT * 10, // 上传相应时间放宽到 100 秒
    });
  }
}
