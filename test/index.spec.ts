import env from 'dotenv';
import { Vika } from '../lib';
import { IRecord, INewRecords } from '../lib/interface';
env.config();

jest.setTimeout(30000);

describe('full pipeline', () => {
  const datasheet = new Vika({
    token: process.env.VIKA_API_TOKEN as string,
    host: process.env.VIKA_API_HOST as string || 'https://api.vika.cn/fusion/v1',
  }).datasheet(process.env.VIKA_API_DATASHEET as string);

  let records: IRecord[];

  // 读取初始
  it('list records', async () => {
    console.time('list records');
    const result = await datasheet.all();
    console.timeEnd('list records');
    console.log('list records ids', result.data?.records.map(r => r.recordId));
    expect(result.success).toBeTruthy();
    records = result.data!.records;
  });

  // 删除所有 records
  it('delete records', async () => {
    console.time('delete records');
    const result = await datasheet.del(records.map(record => record.recordId));
    console.timeEnd('delete records');

    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
  });

  // 删除所有 records
  it('add records', async () => {
    const recordsToAdd: INewRecords[] = [{
      fields: {
        '选项': ['测试选项1'],
      }
    }];

    console.time('add records');
    const result = await datasheet.create(recordsToAdd);
    console.timeEnd('add records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });

  it('add records by fieldId', async () => {
    const recordsToAdd: INewRecords[] = [{
      fields: {
        fldR0yRiFXQyh: ['测试选项 2'],
      }
    }];

    console.time('add records');
    const result = await datasheet.create(recordsToAdd, 'id');
    console.timeEnd('add records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });
});
