import FormData from 'form-data';
import { DEFAULT_REQUEST_TIMEOUT } from '../const';
import { IDatasheetCreateRo, IAttachment } from '../interface';
import { IDatasheetCreateVo } from '../interface/datasheet.create.vo';
import { Vika } from '../apitable';
import { FieldManager } from './field';
import { RecordManager } from './record';
import { ViewManager } from './view';
import { IEmbedLinkCreateRo, IEmbedLinkCreateVo } from '../interface/embed.link';


export class Datasheet {
  apitable: Vika
  spaceId: string
  datasheetId: string

  constructor(spaceId: string, datasheetId: string, apitable: Vika) {
    this.apitable = apitable;
    this.spaceId = spaceId;
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
  * Create Form.
  */
  async create(datasheetCreateRo: IDatasheetCreateRo) {
    if (!this.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space station for the operation.');
    }
    return await this.apitable.request<IDatasheetCreateVo>({
      path: `/spaces/${this.spaceId}/datasheets`,
      method: 'post',
      data: datasheetCreateRo
    });
  }

  /**
   * Upload files.
   * @param file 
   * @returns 
   */
  async upload(file: any, options?: FormData.AppendOptions) {
    // Only one file is allowed to be uploaded at a time.
    if (Array.isArray(file)) {
      file = file[0];
    }
    const form = new FormData();
    form.append('file', file, options);
    return await this.apitable.request<IAttachment>({
      path: `/datasheets/${this.datasheetId}/attachments`,
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(form.getHeaders ? form.getHeaders() : {}),
      },
      timeout: this.apitable.config.requestTimeout || DEFAULT_REQUEST_TIMEOUT * 10, // The corresponding upload time is relaxed to 100 seconds.
    });
  }

  async createEmbedLink(embedLinkCreateRo?: IEmbedLinkCreateRo) {
    if (!this.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space station for the operation.');
    }
    return await this.apitable.request<IEmbedLinkCreateVo>({
      path: `/spaces/${this.spaceId}/nodes/${this.datasheetId}/embedlinks`,
      method: 'post',
      data: embedLinkCreateRo
    });
  }

  async getEmbedLinks() {
    if (!this.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space station for the operation.');
    }
    return await this.apitable.request<IEmbedLinkCreateVo[]>({
      path: `/spaces/${this.spaceId}/nodes/${this.datasheetId}/embedlinks`,
      method: 'get'
    })
  }

  /**
   * @param linkId 
   * @returns 
   */
  async deleteEmbedLink(linkId: string) {
    if (!this.spaceId) {
      throw new Error('Please enter the spaceId parameter when building the space object to determine the space station for the operation.');
    }
    return await this.apitable.request<IEmbedLinkCreateVo[]>({
      path: `/spaces/${this.spaceId}/nodes/${this.datasheetId}/embedlinks/${linkId}`,
      method: 'delete'
    })
  }
}
