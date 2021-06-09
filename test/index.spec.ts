import env from 'dotenv';
import fs from 'fs';
import path from 'path';
import Vika from '../lib';
import { INodeItem, IRecord } from '../lib/interface';
env.config();

jest.setTimeout(30000);

describe('full pipeline', () => {
  const vika = new Vika({
    token: process.env.VIKA_API_TOKEN as string,
    host: process.env.VIKA_API_HOST as string || 'https://api.vika.cn/fusion/v1',
  });
  const datasheet = vika.datasheet(process.env.VIKA_API_DATASHEET as string);

  let records: IRecord[];
  let spaceIds: string[];
  let nodes: INodeItem[];

  // 读取初始
  it('list records', async () => {
    console.time('list records');
    const result = await datasheet.records.query({ sort: [{ field: '标题', order: 'desc' }] });
    console.timeEnd('list records');
    if (!result.success) {
      console.error(result);
    }
    expect(result.success).toBeTruthy();
    records = result.data!.records;
  });

  // 删除所有 records
  it('delete records', async () => {
    console.time('delete records');
    const result = await datasheet.records.delete(records.slice(0, 10).map(record => record.recordId));
    console.timeEnd('delete records');

    expect(result.success).toBeTruthy();
  });

  // 增加 records
  it('add records', async () => {
    const recordsToAdd = [{
      fields: {
        '标题': '一行新增的记录' + (new Date).toString(),
      }
    }];

    console.time('add records');
    const result = await datasheet.records.create(recordsToAdd);
    console.timeEnd('add records');
    if (!result.success) {
      console.error(result);
    }
    expect(result.success).toBeTruthy();
    records = result.data!.records;
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });

  // 更新 records
  it('update records', async () => {
    const recordsToUpdate: IRecord[] = [{
      recordId: records[0].recordId,
      fields: {
        '标题': '一行被修改的记录' + (new Date).toString(),
      }
    }];

    console.time('update records');
    const result = await datasheet.records.update(recordsToUpdate);
    console.timeEnd('update records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToUpdate.length);
    const all = await datasheet.records.query();
    // 长度应该跟原表保持一致
    expect(all.data!.records.length).toEqual(records.length);
  });

  it('upload attachment', async () => {
    const file = fs.createReadStream(path.join(__dirname, '../tsconfig.json'));

    console.time('upload attachment');
    const result = await datasheet.upload(file);
    if (!result.success) {
      console.error(result);
    }
    console.timeEnd('upload attachment');

    expect(result.success).toBeTruthy();
  });
  // spaces list
  it('get space list', async () => {
    const result = await vika.spaces.list();
    expect(result.success).toBeTruthy();
    spaceIds = result.data!.spaces.map(item => item.id);
  });
  // nodes list 
  it('get node list', async () => {
    const result = await vika.nodes.list({ spaceId: spaceIds[0] });
    expect(result.success).toBeTruthy();
    nodes = result.data!.nodes;
  });
  // node detail
  it('get node detail', async () => {
    const firstNode = nodes[0];
    const result = await vika.nodes.get({ spaceId: spaceIds[0], nodeId: firstNode.id });
    expect(result.success).toBeTruthy();
    expect(result.data?.id).toEqual(firstNode.id);
  });
});
