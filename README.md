维格表官方 JavaScript SDK, 让你轻松拥有维格表扩展能力

# Vika
Vika JavaScript SDK 是对维格表 Fusion API 的官方封装，可以很方便的对你的维格表中的数据进行增删改查操作。你可以轻松的将维格表中的数据集成到你自己的应用中

## 安装

## Npm
```
npm install @vikadata/vika -S
```

## script 标签直接引入
下载 [https://raw.githubusercontent.com/vikadata/vika/master/vika.browser.js]()
通过 script 引入 vika.browser.js 之后 Vika 会直接挂载到 window 上
```html
<script src="./vika.browser.js"></script>
<script>
Vika.auth({ token: "YOUR_API_TOKEN"})
</script>
```

## 更友好的文档体验
我们提供了基于维格表自身数据生成的“动态文档”，访问 [vika.cn](https://vika.cn) 进入想要操作的表格，在表格工具栏的最右边有 API 按钮，点击后可以查看根据当前表格的数据类型量身定制的文档。选择语言 JavaScript 就可以呈现本 SDK 的调用示例

## 快速上手
在执行所有操作之前，你需要使用自己的 API Token 来进行鉴权。以获得操作维格表的能力。访问 [vika.cn](https://vika.cn) 登陆后点击左下角的头像，选择个人中心就可以获取到

> 如果是在 Node.js 环境中，你可能不能使用 es6 import，可以使用下面方式来引入。
```js
const Vika = require('@vikadata/vika').default;
```
以下是 es6 示例
```js
import { Vika } from '@vikadata/vika';

Vika.auth({
  token: '你的 API Token'
});

/**
 * 全局参数配置
 */
Vika.auth({
  /**
   * (必填) string 你的 API Token，用于鉴权
   */
  token: 'YOUR_API_TOKEN',
  /**
   * （选填）全局指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey: 'name', // 默认值
  /**
   * （选填）请求失效时间
   */
  requestTimeout: 60000, // 默认 60000ms (10 秒)
  /**
   * （选填）目标服务器地址
   */
  host: 'https://api.vika.cn/fusion/v1', // 默认值
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

我们拿到 datasheetId 之后，就可以使用 SDK 来进行数据操作

### 获取记录数据（Records）

#### 全部加载: datasheet.all
>SDK 会以最大值每次请求 1000 个 Record，串行加载直到表格全部加载完毕。

```js
import { Vika } from '@vikadata/vika';

Vika.auth({ token: 'YOUR_API_TOKEN' });

// 通过 datasheetId 来指定要从哪张维格表获取数据。
const datasheet = Vika.datasheet('datasheetId');

// all() 方法会返回 promise，你可以根据需要使用 then 或者 async/await (推荐) 来获取收到的数据
// params 为可选参数，下方有详细参数说明
datasheet.all(params).then(response => {
  
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: array
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
});
```

all 方法可以接收一个可选的配置参数对象，本 SDK 由 typescript 编写，所有配置的数据结构都可以从进入包中 d.ts 查阅。

```js
datasheet.all({
  /**
   * （选填）视图ID。默认为维格表中第一个视图。请求会返回视图中经过视图中筛选/排序后的结果，可以搭配使用fields参数过滤不需要的字段数据
   */
  viewId: 'viewId1',
  /**
   * （选填）对指定维格表的记录进行排序。由多个“排序对象”组成的数组。支持顺序：'asc' 和 逆序：'desc'。注：此参数指定的排序条件将会覆盖视图里的排序条件。
   */
  sort: [{ '列名称或者 ID': 'asc' }],
  /**
   * （选填）recordIds 数组。如果附带此参数，则返回参数中指定的records数组。 返回值按照传入数组的顺序排序。此时无视筛选、排序。无分页，每次最多查询 1000 条
   */
  recordIds: ['recordId1', 'recordId2'],
  /**
   * （选填）指定要返回的字段（默认为字段名, 也可以通过 fieldKey 指定为字段 Id）。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回。
   */
  fields: ['标题', '详情', '引用次数'],
  /**
   * （选填）使用公式作为筛选条件，返回匹配的记录，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解公式使用方式
   */
  filterByFormula: '{引用次数} >  0',
  /**
   * （选填）限制返回记录的总数量。如果该值小于表中实际的记录总数，则返回的记录总数会被限制为该值。
   */
  maxRecords: 5000,
  /**
   * （选填）单元格值类型，默认为 'json'，指定为 'string' 时所有值都将被自动转换为 string 格式。
   */
  cellFormat: 'json',
  /**
   * （选填）指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
   */
  fieldKey: 'name',
});
```

#### 分页加载: datasheet.get

* 可以填写 pageSize 参数来指定分页大小，默认 100，最大 1000

```js
// 分页获取维格表当前视图数据
datasheet.get({
  /**
   * （选填）指定分页的页码，默认为 1，与参数pageSize配合使用。
   */
  pageNum: 1,
  /**
   * （选填）指定每页返回的记录总数，默认为100。此参数只接受1-1000的整数。
   */
  pageSize: 100,
  // 其余参数与 datasheet.all() 相同
}).then(response => {
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: {
   *     // 总记录条数
   *    total: number;
   *    // 每页返回的记录总数
   *    pageSize: number;
   *    // 分页的页码
   *    pageNum: number;
   *    // records 数组
   *    records: Array;
   *   }
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
});
```

#### 获取指定 records：datasheet.find

传入 recordId 数组，即可获取对应的 records 信息，返回与传入数组长度相等的 records

```js
datasheet.find(['recordId1', 'recordId2']).then(response => {
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: array
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
})
```

### 创建 records
首先构造好你要创建的 record 的结构。
> fields 中的 key 默认为字段名。也可以通过 add 方法中的第二个参数 fieldKey 参数指定为 id
```js
const newRecord1 = {
  fields: {
    '文本字段': '你要填入的值',
    '单选字段': '你要填入的值',
    '多选字段': ['选项 1', '选项 2'],
    ...
  }
}
```
更详细的字段值示例请参照 [更友好的文档体验](#更友好的文档体验)

```js
//  add 方法接收一个数组值，可以同时增加多条 record。单次请求可最多增加10条 record
datasheet.add([newRecord1, newRecord2]).then(response => {
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: array
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
})
```


### 更新 records
首先构造好你要修改的 record 的结构。对象 fields 包含一条记录中要新建的字段值，可以包含任意数量的字段值，不一定要包含全部字段。
> 同上, fields 中的 key 默认为字段名。也可以通过 update 方法中的第二个参数 fieldKey 参数指定为 id

***`特别注意：`*** update 只会更新你传入的 fields 下的数据，未传入的不会影响，如果需要清空值，请显示传入 null
```js
const record1 = {
  recordId: 'recordId1', // 一定要指定 recordId 才可以更新数据哦
  fields: {
    '文本字段': '你要修改的值',
    '单选字段': null, // 清空该 field 的值
  }
}
```
更详细的字段值示例请参照 [更友好的文档体验](#更友好的文档体验)

```js
// update 方法接收一个数组值，可以同时更新多条 record，单次请求可最多更新10条 record
datasheet.update([record1, record2]).then(response => {
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: array
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
})
```

### 删除 records
只需要知道 recordId 我们就可以对 record 进行删除操作

```js
// del 方法接收一个数组值，可以同时删除多条 record，单次请求可最多删除10条 record
datasheet.del([recordId1, recordId2]).then(response => {
  /**
   * response 数据包括
   *   success: boolean
   *   code: number
   *   message: string
   *   data: true
   */
  if (response.success) {
    console.log(response.data);
  } else {
    console.error(response);
  }
})
```

### 上传附件
当我们调用 datasheet.create 或者 datasheet.update 方法去给一个附件类型单元格写入内容的时候，需要先将附件文件通过 API 上传，再将得到的结果写入单元格中。
data 中返回的数据，和附件类型单元格的数据是一致的，可以直接放进数组写入单元格里。

> 一次只能上传一个文件，上传完毕后，请尽快写入data 中的数据到附件单元格里，否则附件链接可能失效
```html
<input id="input" name="file" type="file" accept="*" >
```

```js
const input = document.getElementById('#input');
input.onchange = function () {
  const file = this.files[0];
  // 浏览器中使用 input 元素得到文件。NodeJs 中可以传入一个 Buffer 或者 stream
  datasheet.upload(file).then(response => {
    /**
     * response 数据包括
     *   success: boolean
     *   code: number
     *   message: string
     *   data: IAttachment
     */
    if (response.success) {
      console.log(response.data);
    } else {
      console.error(response);
    }
  });
};
```

## 单元测试
请在根目录创建 .env 文件，并以依次写入:

```bash
VIKA_API_TOKEN=YOUR TOKEN
VIKA_API_HOST=YOUR HOST
VIKA_API_DATASHEET=YOUR DATASHEET ID
```

执行 `yarn test`

### 注意
测试代码会对数据进行读写，请创建一张新的表用于测试
