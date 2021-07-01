从 0.1.x 迁移到 1.0 版本

npm
```shell
npm install @vikadata/vika@latest
```
yarn
```shell
yarn add @vikadata/vika@latest
```

## 兼容性改动

JS SDK 全面升级，现在支持更多的 API 接口。为了更好的实现 API 调用，我们做了一些不兼容改动。

整体改动：
+ Vika 现在需要实例化才能使用
+ 操作记录的方法从 datasheet 转移到 datasheet.records
  ```js
  Vika.datasheet('dstId').<CRUD Method> => vika.datasheet('dstId').records.<CRUD Method>
  ```

### 实例化客户端

```js
// 0.1.x ❌
import { Vika } from '@vikadata/vika';

Vika.auth({
  token: "your token"
})

// 1.x ✅
import { Vika } from '@vikadata/vika';

const vika = new Vika({
  token: "your token"
})

```

### 查询记录

```js
// 0.1.x ❌
// 查询全部记录
Vika.datasheet('datasheetId').all()

// 1.x ✅
// 查询记录，分页。不返回全部数据
vika.datasheet('datasheetId').records.query()
// 查询全部记录，自动处理分页请求，迭代返回每页数据。
for await (const eachPageRecords of vika.datasheet('datasheetId').records.queryAll()) {
  console.log(eachPageRecords)
}

```
### 创建记录
```js
// 0.1.x
const newRecord1 = {
  fields: {
    '文本字段': '你要填入的值',
    '单选字段': '你要填入的值',
    '多选字段': ['选项 1', '选项 2'],
    ...
  }
}
Vika.datasheet('datasheetId').add([newRecord1, newRecord2])
// 1.x ✅
vika.datasheet('datasheetId').records.create([newRecord1, newRecord2])

```

### 更新记录

```js
// 0.1.x ❌
Vika.datasheet('datasheetId').update([record1, record2])

// 1.x ✅
vika.datasheet('datasheetId').records.update([record1, record2])
```
### 删除记录

```js
// 0.1.x ❌
Vika.datasheet('datasheetId').del(['recordId1', 'recordId2'])

// 1.x ✅
vika.datasheet('datasheetId').records.delete(['recordId1', 'recordId2'])
```