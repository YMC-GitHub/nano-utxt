# @utxt/stro-parse

a package library for utxt to pick strm

## User installing

- You can import directly via npm cdn

```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/@utxt/strm-pick@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool

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
// import { pick,omit,stroNameToRule } from "@utxt/strm-pick";
import { pick,omit,stroNameToRule } from "./main";
export function demo(){
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
  console.log(rule)
  // rule = '*help,*version,*workspace'
  
  let base:string=''
  base = pick(strm, rule);
  console.log(base)
  // -h,--help boolean info help (default:false)
  // -v,--version boolean info version (default:false)
  // -w,--workspace string set workspace location (default:./)
  
  
  base = pick(strm, '*editjson');
  console.log(base)
  // --file string set file location in editjson (default:package.json)
  // -n,--name string set name in editjson (default:)
  // -v,--value string set value in editjson (default:)
  // -t,--type string set value to type in editjson (default:)
  // --ns string set ns in editjson (default:)
  // --ns-sep string set ns-sep in editjson (default:.)
  
  base = omit(strm, stroNameToRule("demo,usage,alias,cmd,option", "*"));
  base = pick(base, "*in feat");
  console.log(base)
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
  console.log(head)

  // usage: yours <cmd> [option]
  // demo: yours get-feat --file lib/main.ts --field feat --out-file CHANGELOG.FEAT.md
  // cmd: get-feat,feat
  // option:
  opts = pick(omit(strm, headrule), "*in feat");
  console.log(opts);

  // --text string set text in feat
  // --file string set file location in feat
  // --field string set field name in feat
  // --out-file string set out-file location in feat

  text = [head,opts].join(`\n`)
  console.log(text);

}
demo()
```

## Product Closed Loop

Small, single function, only do one thing - for utxt to pick strm

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.

## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.
