# @utxt/strm-pick

一个类库包，用于 utxt 提取 strm

## 用户安装

- 您可以通过npm cdn 直接引入

```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/@utxt/strm-pick@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- 您可以通过类库安装工具安装

```bash
npm i @utxt/strm-pick
```

```bash
yarn add @utxt/strm-pick
```

```bash
pnpm add @utxt/strm-pick
```

```ts
import { pick,omit } from "@utxt/strm-pick";
let strm:string=''
strm=`
-h,--help boolean info help (default:false)
-v,--version boolean info version (default:false)
-w,--workspace string set workspace location (default:./)

--file string set file location in editjson (default:package.json)
-n,--name string set name in editjson (default:)
-v,--value string set value in editjson (default:)
-t,--type string set value to type in editjson (default:)
--ns string set ns in editjson (default:)
--ns-sep string set ns-sep in editjson (default:.)

--utxt-loc string set utxt location in code
--code-out string set output location in code
`

let rule:string=''
rule = stroNameToRule("help,version,workspace", "*");
// rule = '*help,*version,*workspace'

let base:string=''
base = pick(strm, rule);
//base
// -h,--help boolean info help (default:false)
// -v,--version boolean info version (default:false)
// -w,--workspace string set workspace location (default:./)


base = pick(strm, '*editjson');
// --file string set file location in editjson (default:package.json)
// -n,--name string set name in editjson (default:)
// -v,--value string set value in editjson (default:)
// -t,--type string set value to type in editjson (default:)
// --ns string set ns in editjson (default:)
// --ns-sep string set ns-sep in editjson (default:.)

base = omit(strm, stroNameToRule("demo,usage,alias,cmd,option", "*"));
base = pick(base, "*in feat");
// --text string set text in feat
// --file string set file location in feat
// --field string set field name in feat
// --out-file string set out-file location in feat


strm=`
usage: yours <cmd> [option]
demo: yours get-feat --file lib/main.ts --field feat --out-file CHANGELOG.FEAT.md
cmd: get-feat,feat
option:
--text string set text in feat
--file string set file location in feat
--field string set field name in feat
--out-file string set out-file location in feat
`
let head:string='';let opts:string='';let headrule:string='';let text:string=''
headrule = stroNameToRule("demo,usage,alias,cmd,option", "*")
head = pick(strm, headrule);
// usage: yours <cmd> [option]
// demo: yours get-feat --file lib/main.ts --field feat --out-file CHANGELOG.FEAT.md
// cmd: get-feat,feat
// option:
opts = pick(omit(strm, headrule), "*in feat");
// --text string set text in feat
// --file string set file location in feat
// --field string set field name in feat
// --out-file string set out-file location in feat
```

## 产品闭环

很小，功能单一，只做一件事 —— 用于 utxt 提取 strm

## 产品运维

因为功能简单，决定了它的开发速度，更新速度，问题速度不会很慢

## 产品计划

因为功能单一，功能已经基本完成，后期主要根据命令包或其他类库包的需要，更新小补丁，不会有功能大改的情况出现，架构可能会随着技术的更新而有变化

## 许可证书

您可以使用它做任何事，但是请不要违发您所在地区法律。我不会为您的行为承担任何责任。

## 结束语

> 身为一名程序员我很自豪，虽然足不出户，指尖却有着可以改变世界 (可能有点大了) 自己的力量。即使不能实现，将其作为努力的目标也不错。———— 摘自 lencx

它就是一张白纸，您有什么设想，可以直接编码出来，怎么编，规则怎么定，有您决定。
