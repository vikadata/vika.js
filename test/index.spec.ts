import env from 'dotenv';
import { Vika } from '../lib';
import { IRecord, INewRecords } from '../lib/interface';
env.config();

jest.setTimeout(30000);

describe('full pipeline', () => {
  const datasheet = new Vika({
    token: process.env.VIKA_API_TOKEN as string,
    host: 'https://integration.vika.ltd/fusion/v1',
  }).datasheet('dstWRpcsQstUnqX9hg');

  let records: IRecord[];

  // 读取初始
  it('list records', async () => {
    console.time('list records');
    const result = await datasheet.all();
    console.timeEnd('list records');
    expect(result.success).toBeTruthy();
    records = result.data!.records;
    expect(records.length).toBeGreaterThan(0);
  });


  it('delete records', async () => {
    console.time('delete records');
    const result = await datasheet.del(records.map(record => record.recordId));
    console.timeEnd('delete records');

    console.log('delete result', result);

    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
  });

  it('add records', async () => {
    const recordsToAdd: INewRecords[] = [{
      fields: {
        '标题': '测试标题 1',
        '选项': '测试选项 1',
      }
    }, {
      fields: {
        '标题': '测试标题 2',
        '选项': '测试选项 2',
      }
    }];

    console.time('add records');
    const result = await datasheet.create(recordsToAdd);
    console.timeEnd('add records');

    expect(result.success).toBeTruthy();
    expect(result.data!.records.length).toEqual(recordsToAdd.length);
  });
});
