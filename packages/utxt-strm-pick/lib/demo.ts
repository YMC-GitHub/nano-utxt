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
