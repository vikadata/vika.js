import env from 'dotenv';
import fs from 'fs';
import { Buffer } from 'buffer';
import path from 'path';
import { Vika } from '../lib';
import { DatasheetCreateRo, INodeItem, IRecord } from '../lib/interface';
import { DatasheetFieldCreateRo } from '../lib/interface/datasheet.field.create.ro';
import { IAddOpenSingleTextFieldProperty } from '../lib/interface/field.create.property';

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
  let createdDatasheetId: string;
  let createdFieldId: string;

  it('fieldKey', async () => {
    const vika = new Vika({
      token: process.env.VIKA_API_TOKEN as string,
      host: process.env.VIKA_API_HOST as string || 'https://api.vika.cn/fusion/v1',
      fieldKey: 'id',
    });
    const datasheet = vika.datasheet(process.env.VIKA_API_DATASHEET as string);
    console.time('list records');
    const result = await datasheet.records.query();
    console.timeEnd('list records');
    if (!result.success) {
      console.error(result);
    }
    expect(result.success).toBeTruthy();
    records = result.data!.records;
    expect(Object.keys(records[0].fields).every(key => key.startsWith('fld'))).toBeTruthy();
  });
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

  it('upload buffer attachment', async () => {
    const buf = Buffer.from('hello world', 'utf8');
    console.time('upload attachment');
    const result = await datasheet.upload(buf, { filename: 'text.txt' });
    if (!result.success) {
      console.error(result);
    }
    console.timeEnd('upload attachment');
    expect(result.success).toBeTruthy();
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

  it('create datasheet', async () => {
    const ro: DatasheetCreateRo = {
      name: '新建单测表格'
    };
    const spaceId = spaceIds[0];
    const res = await vika.space(spaceId).createDatasheet(ro);
    expect(res.success).toBeTruthy();
    createdDatasheetId = res.data?.id||'';
  })

  it('create field', async () => {
    const property: IAddOpenSingleTextFieldProperty = {
      defaultValue: '我是默认值'
    };
    const ro: DatasheetFieldCreateRo = {
      name: '新增文本字段',
      type: 'SingleText',
      property
    };
    const spaceId = spaceIds[0];
    const res = await vika.space(spaceId).datasheet(createdDatasheetId).createField(ro);
    expect(res.success).toBeTruthy();
    expect(res.data?.id).toBeDefined();
    createdFieldId = res.data?.id||'';
  })

  it('delete field', async () => {
    const spaceId = spaceIds[0];
    const res = await vika.space(spaceId).datasheet(createdDatasheetId).fields.delete(createdFieldId);
    expect(res.success).toBeTruthy();
  })

});
