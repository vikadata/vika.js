维格表官方 JavaScript SDK, 让你轻松拥有维格表扩展能力

# Vika
Vika JavaScript SDK 是对维格表 Fusion API 的官方封装，可以很方便的对你的维格表中的数据进行增删改查操作。你可以轻松的将维格表中的数据集成到你自己的应用中。

## 安装

## Npm
```
npm install @vikadata/vika
```

## script 标签直接引入
引入 vika.browser.js 之后 Vika 会直接挂载到 window 上
```html
<script src="https://raw.githubusercontent.com/vikadata/vika/master/vika.browser.js"></script>
<script>
Vika.init({ token: "YOUR_DEVELOPER_TOKEN"})
</script>
```

## 快速入门
在执行所有操作之前，你需要使用自己的 developer token 来进行鉴权。以获得操作维格表的能力。

```jsx
import { Vika } from '@vikadata/vika';

Vika.init({
    token: 'YOUR_DEVELOPER_TOKEN'
});
```

### 指定维格表

不管是读取数据还是写入数据，都需要明确好要对哪张维格表进行操作。我们可以通过 URL 获得维格表 Id, 也就是 `datasheetId`。

URL 中不同部分的含义如下

```jsx
https://vika.cn/space/{spaceId}/workbench/{datasheetId}/{viewId}
```

在你的空间中打开一张维格表，你会看到类似下方的一条连接

```jsx
https://vika.cn/space/spcBwlBKaAwB7/workbench/dstXXXXXXXXXXXXXXX/viwZgdBLZbuFA
```

可以看到，workbench 后面跟随的字符串就是 `datasheetId`，此时就是 `dstXXXXXXXXXXXXXXX`

### 指定视图

```jsx
datasheet.select({ viewName: "Bieber 的视图" })
```

### 获取 Records

#### 全部加载: datasheet.all

* SDK 一次性最多会加载 1000 个 Record。串行加载直到全部加载完毕。可以填写 maxRecords 参数来指定每次加载数量
* 填写 viewId，获取指定视图中的 records，顺序与视图中保持一致。（推荐）
* 如果不填写 viewId 的话，会获取这张维格表的全部内容（注意：此时返回的 records 是不保证顺序的）。

```jsx
import { Vika } from 'vika-fusion-sdk';

Vika.init({ token: 'YOUR_DEVELOPER_TOKEN' });

// 通过 datasheetId 来制定要从哪张维格表获取数据。
const datasheet = Vika.datasheet('dstId');

// all() 方法会返回 promise，你可以使用 then
datasheet.select({ viewId: "viwXYZ" }).all().then(records => {
}).catch(err => {
  console.error(err);
});
// ，也可以在 async 函数中使用 await。
```

#### 分页加载: datasheet.eachPage

```jsx
// 分页获取维格表当前视图所有数据
datasheet.select({
    pageSize: 100, // 每页 100 个
		viewId: "viwXXX",
}).eachPage((records, fetchNextPage) => {
    // 每加载一页 records，这个函数就会被调用一次

    records.forEach(function(record) {
        console.log('Retrieved', record.getByName('任务名'));
    });

    // 调用 `fetchNextPage` 获取剩余的数据.
    // 如果剩余数据存在的话，则会继续递归调用.
    // 如果所有的的 records 都获取完毕, `done` 会被调用。
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
```

#### 获取指定 records：datasheet.find

传入 recordId 数组，即可获取对应的 records 信息，返回与传入数组长度相等的 records，如果 recordId 不存在，则数组中元素为 `null`

```jsx
datasheet.find(['recId1', 'recId2']).then(records => {
  console.log(records);
}).catch(err => {
  console.error(err);
};
```
