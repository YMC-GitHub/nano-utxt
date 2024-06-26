# @utxt/objm-to-objf

一个类库包，用于 utxt 变换 utxt-objm 为 utxt-objf，utxt-objf 类似 nano-flag 
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
npm i @utxt/objm-to-objf
```

```bash
yarn add @utxt/objm-to-objf
```

```bash
pnpm add @utxt/objm-to-objf
```

```ts
import { transform } from "@utxt/objm-to-objf";
let objf = transform(`-h,--help boolean info help (default:false) (index:-1) (optional:false)`);
// {help:false,h:false}
```

## 产品闭环

很小，功能单一，只做一件事 —— 变换 utxt-objm 为 utxt-objf，utxt-objf 类似 nano-flag 

## 产品运维

因为功能简单，决定了它的开发速度，更新速度，问题速度不会很慢

## 产品计划

因为功能单一，功能已经基本完成，后期主要根据命令包或其他类库包的需要，更新小补丁，不会有功能大改的情况出现，架构可能会随着技术的更新而有变化

## 许可证书

您可以使用它做任何事，但是请不要违发您所在地区法律。我不会为您的行为承担任何责任。

## 结束语

> 身为一名程序员我很自豪，虽然足不出户，指尖却有着可以改变世界 (可能有点大了) 自己的力量。即使不能实现，将其作为努力的目标也不错。———— 摘自 lencx

它就是一张白纸，您有什么设想，可以直接编码出来，怎么编，规则怎么定，有您决定。
