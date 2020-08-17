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
在执行所有操作之前，你需要使用自己的 Developer Token 来进行鉴权。以获得操作维格表的能力。访问 <vika.cn> 登陆后点击左下角的头像，选择个人中心就可以获取到。

```jsx
import { Vika } from '@vikadata/vika';

Vika.init({
  token: 'YOUR_DEVELOPER_TOKEN'
});
```

### 获取维格表 ID

不管是读取数据还是写入数据，都需要明确好要对哪张维格表的哪张视图进行操作

打开一张维格表，通过 URL 获得就可以获得

维格表 ID `datasheetId`， 以及视图 ID `viewId`

URL 中不同部分的含义如下

```jsx
https://vika.cn/space/{spaceId}/workbench/{datasheetId}/{viewId}
```

我们拿到 ID 之后，就可以使用 SDK 来获取数据了

### 获取行数据（Records）

#### 全部加载: datasheet.all

* 填写 viewId，获取指定视图中的 records，顺序与视图中保持一致。（推荐）
* 如果不填写 viewId 的话，会获取这张维格表的全部内容（注意：此时返回的 records 是不保证顺序的）。
* SDK 会以最大值每次请求 1000 个Record，串行加载直到表格全部加载完毕。

```jsx
import { Vika } from 'vika-fusion-sdk';

Vika.init({ token: 'YOUR_DEVELOPER_TOKEN' });

// 通过 datasheetId 来制定要从哪张维格表获取数据。
const datasheet = Vika.datasheet('datasheetId');

// all() 方法会返回 promise，你可以使用 then，也可以在 async 函数中使用 await。
datasheet.select({ viewId: "viewId" }).all().then(records => {
}).catch(err => {
  console.error(err);
});
```

#### 分页加载: datasheet.eachPage

* 可以填写 pageSize 参数来指定分页大小，默认 100，最大 1000

```jsx
// 分页获取维格表当前视图所有数据
datasheet.select({
    pageSize: 100,
    viewId: "viewId",
}).eachPage((records, fetchNextPage) => {
    // 每加载一页 records，这个函数就会被调用一次
    console.log(records);

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
