import env from 'dotenv';
import fs from 'fs';
import { Vika } from '../lib';
import { IRecord, INewRecords } from '../lib/interface';
import path from 'path';
env.config();

jest.setTimeout(30000);

describe('full pipeline', () => {
  const datasheet = Vika.auth({
    token: process.env.VIKA_API_TOKEN as string,
    host: process.env.VIKA_API_HOST as string || 'https://api.vika.cn/fusion/v1',
  }).datasheet(process.env.VIKA_API_DATASHEET as string);

  let records: IRecord[];

  // 读取初始
  it('list records', async () => {
    console.time('list records');
    const result = await datasheet.all();
    console.timeEnd('list records');
    expect(result.success).toBeTruthy();
    records = result.data!.records;
  });

  // 删除所有 records
  it('delete records', async () => {
    console.time('delete records');
    const result = await datasheet.del(records.slice(0, 10).map(record => record.recordId));
    console.timeEnd('delete records');

    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
  });

  // 增加 records
  it('add records', async () => {
    const recordsToAdd: INewRecords[] = [{
      fields: {
        '标题': '一行新增的记录' + (new Date).toString(),
      }
    }];

    console.time('add records');
    const result = await datasheet.add(recordsToAdd);
    console.timeEnd('add records');
    records = result.data!.records;
    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });

  // 删除所有 records
  it('update records', async () => {
    const recordsToUpdate: IRecord[] = [{
      recordId: records[0].recordId,
      fields: {
        '标题': '一行被修改的记录' + (new Date).toString(),
      }
    }];

    console.time('update records');
    const result = await datasheet.update(recordsToUpdate);
    console.timeEnd('update records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToUpdate.length);
  });

  it('add records by fieldId', async () => {
    const recordsToAdd: INewRecords[] = [{
      fields: {
        fldR0yRiFXQyh: ['测试选项 2'],
      }
    }];

    console.time('add records');
    const result = await datasheet.add(recordsToAdd, 'id');
    console.timeEnd('add records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });

  it('upload attachment', async () => {
    const file = fs.createReadStream(path.join(__dirname, '../tsconfig.json'));

    const result = await datasheet.upload(file);
    expect(result.success).toBeTruthy();
  });
});
