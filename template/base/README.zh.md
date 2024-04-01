一个类库包，用于解析简单的文本值为 js 原始值

## 文件大小

file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 1.03kb | 0.48kb | 0.39kb
dist/main.js | 0.94kb | 0.42kb | 0.33kb
dist/main.min.cjs | 0.75kb | 0.44kb | 0.35kb
dist/main.min.js | 0.67kb | 0.39kb | 0.32kb
dist/main.umd.cjs | 1.41kb | 0.60kb | 0.50kb
dist/main.umd.min.cjs | 0.89kb | 0.51kb | 0.42kb

~~备注： 带有 min 标志的文件未上传~~

## 项目背景

曾经完成过这样的一个需求：将简单的文本值转为 js 原始值

## 当前功能

- 在 js 中 解析简单的文本值为 js 原始值 
- 支持 js 原始值作为输入

## 用户安装

- 您可以通过npm cdn 直接引入
```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/nano-strv-parse@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- 您可以通过类库安装工具安装
```bash
npm i nano-strv-parse
```

```bash
yarn add nano-strv-parse
```

```bash
pnpm add nano-strv-parse
```

```ts
import {StrvParse} from 'nano-strv-parse'
StrvParse('true') // true
StrvParse('false') // false
StrvParse('1') // 1
StrvParse('null') // null
StrvParse('undefined') // undefined
StrvParse('zero') // 'zero'
StrvParse('1','string') // '1'
StrvParse(1,'string') // '1'
```

## 产品闭环

很小，功能单一，只做一件事—— 在 js 中 解析简单的文本值为 js 原始值

## 产品运维

因为功能简单，决定了它的开发速度，更新速度，问题速度不会很慢

## 产品计划

因为功能单一，功能已经基本完成，后期主要根据命令包或其他类库包的需要，更新小补丁，不会有功能大改的情况出现，架构可能会随着技术的更新而有变化

## 许可证书

您可以使用它做任何事，但是请不要违发您所在地区法律。我不会为您的行为承担任何责任。

## 结束语

> 身为一名程序员我很自豪，虽然足不出户，指尖却有着可以改变世界 (可能有点大了) 自己的力量。即使不能实现，将其作为努力的目标也不错。———— 摘自 lencx

它就是一张白纸，您有什么设想，可以直接编码出来，怎么编，规则怎么定，有您决定。