// a library package to parse nano-utxt-stro

// recommended-lib-name:nano-utxt-stro-parse

// apis
// /**
//  *
//  * @sample
//  * ```ts
//  *
//  * ```
//  */
// export function parse(input: string, key?: string) {
//   // help boolean info help (default:false) -> (default:'false')
//   let reg = key ? new RegExp(`\\(${key}:.*\\)`) : /\(default:.*\)/;
//   // console.log(reg)

//   // code(core): get match kv
//   let match = input.match(reg);
//   let matchValue = match ? match[0] : "";

//   // (default:'false') -> false
//   reg = key ? new RegExp(`${key}:`, "ig") : /default:/gi;
//   let value = matchValue
//     .replace(/\(|\)/gi, "")
//     .replace(reg, "")
//     .replace(/(^')|('$)/gi, "");
//   return [matchValue, value];
// }

// util
// a library package to get regexp for kvse in utxt-stro-parse
// recommeded-lib-name:utxt-stro-parse-util,kvseRegexpify
// kvse is short for key-val-string-exp
// rify,regify is short for regexpify
/**
 * get kvse regexp
 * @sample
 * ```ts
 * // (key:val) regexpify
 * stroKvseRegify('default')
 *
 * // get regexp for '(index:-1)'
 * stroKvseRegify('index') ///\(index:.*\)/i
 * ```
 */
export function stroKvseRegify(key?: string, small?: boolean) {
  // only the small one?
  if (small) {
    return key ? new RegExp(`\\(${key}:[^)]*\\)`, "i") : /\(default:[^)]*\)/i;
  }
  return key ? new RegExp(`\\(${key}:.*\\)`, "i") : /\(default:.*\)/i;
}

// a library package to match kvse in utxt-stro-parse
// recommeded-lib-name:utxt-stro-parse-util,kvse-match
// kvse is short for key-val-string-exp
export function stroKvseMatch(input: string, key?: string, small?: boolean) {
  const reg = stroKvseRegify(key, small);
  const match = input.match(reg);
  return match ? match[0] : "";
}

// a library package to parse kvse in utxt-stro-parse
// recommeded-lib-name:utxt-stro-parse-util,kvse-parse

/**
 *
 * @sample
 * ```ts
 * stroKvseParse(`help boolean info help (default:false) (index:-1) (optional:true)`,'index') // {name:'index',value:'-1',kvse:'(index:-1)'}
 * ```
 */
export function stroKvseParse(
  input: string,
  key?: string,
  small: boolean = true,
  trimQuotation: boolean = false
) {
  const kvse = stroKvseMatch(input, key, small);
  // get k and v -> trim
  // get k and v : trim label and del
  let [name, value] = kvse
    .replace(/(^\()|(\)$)/gi, "")
    .split(":")
    .map((v) => v.trim());

  if (trimQuotation) {
    if (/^'[^']*'$/.test(value)) {
      value = value.replace(/(^')|('$)/gi, "");
    } else if (/^"[^"]*"$/.test(value)) {
      value = value.replace(/(^")|("$)/gi, "");
    }
  }
  //idea(core): named it as kvse-objf,kvse-json
  return { name, value, kvse };
}

export const kvseKeys: string = "default,index,optional,type";

export interface UtxtObjo {
  [prop: string]: string;
  name: string;
  value: string;
  type: string;
  desc: string;
  index: string;
  optional: string;
}
export type UtxtObjoLike = Partial<UtxtObjo>;
const builtinUtxtObjo: UtxtObjo = {
  name: "",
  value: "",
  type: "string",
  desc: "",
  index: "-1",
  optional: "true",
};
export function tconf(passed?: object, defs?: object): any {
  return { ...(passed ? passed : {}), ...(defs ? defs : {}) };
}

/**
 *
 * @sample
 * ```ts
 * stroUtxtParse(`help boolean info help (default:false) (index:-1) (optional:true)`) // {name:'help',type:'boolean',desc:'info help ',value:'false',index:'-1',optional:'true'}
 * ```
 */
export function stroUtxtParse(
  input: string | string[],
  keys?: string,
  trimDesc: boolean = true
) {
  // name,value,desc,type,
  const inited = tconf({}, builtinUtxtObjo);
  let { name, type, desc } = inited;

  const stra: string[] = Array.isArray(input) ? input : input.split(/ +/);
  // put name and type with 1,2 item
  [name, type] = stra;

  // put desc with 1,2 item
  desc = stra.slice(2).join(" ");

  const ckey = keys != undefined ? keys : kvseKeys;

  // 1. define prefer name map
  // pnm is short for prefer-name map
  const preferNameFlag: PlainObject = kvsmDef(kvsmFromKvso(`default:value`));

  // idea(core)：pnm from kvso (todo)
  // kvso <-> flag
  // `default:value,`

  // 2. get alias from label map
  // kvlm is short for key-val label map
  // function kvlmGet(kvlm:PlainObject,key:string){
  //   return  kvlm[key]?kvlm[key]:key
  // }

  const keysAliasFlag: PlainObject = kvsmFlip(preferNameFlag);

  const keya = ckey
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v);
  // idea(core): custom keys
  for (let index = 0; index < keya.length; index++) {
    const key = keya[index];
    // value -> default
    // use alias if key in alias map
    const lname = kvsmGet(keysAliasFlag, key);

    // pase kvse with prompt,key
    const objp = stroKvseParse(desc, key);

    if (objp.kvse) {
      // inited[objfname]=objp.value
      // use prefer-name if name in prefer-name map
      const objfname = kvsmGet(preferNameFlag, lname);
      inited[objfname] = objp.value;
      desc = desc.replace(objp.kvse, "");
    }
  }
  // do you really need desc trim ?
  if (trimDesc) {
    desc = desc.trim();
  }
  return { ...inited, name, type, desc };
}

// 1. define prefer name map

/**
 *
 * @sample
 * ```ts
 * // pnm is short for prefer-name map
 * let pnm = kvsmDef({default:'value',})
 *
 * let preferNameFlag:PlainObject =kvsmDef(kvsoFlagify(`default:value`))
 * ```
 */
export function kvsmDef(kvlm?: PlainObject) {
  return { ...(kvlm ? kvlm : {}) };
}
// idea(core)：pnm from kvso (todo)
// kvso <-> flag
/**
 *
 * @sample
 * ```ts
 * kvsmFromKvso(`default:value`,':,') // {default:'value'}
 * ```
 */
export function kvsmFromKvso(kvso: string, sep?: string) {
  const [kvs, isep] = (sep !== undefined ? sep : ":,").split("");
  // str->arr -> trim -> ignore-empty
  const res: PlainObject = {};
  const arrl = kvso
    .split(isep)
    .map((v) => v.trim())
    .filter((v) => v);
  for (let index = 0; index < arrl.length; index++) {
    const item = arrl[index];
    const [k, v] = item
      .split(kvs)
      .map((v) => v.trim())
      .filter((v) => v);
    // use key as val if val not exist
    res[k] = v ? v : k;
  }
  return res;
}

// 2. get alias from label map
// kvsm is short for key-val string map
/**
 *
 * @sample
 * ```ts
 * let lname = kvsmGet(aliasmap,key)
 * ```
 */
export function kvsmGet(kvlm: PlainObject, key: string) {
  return kvlm[key] ? kvlm[key] : key;
}

export type PlainObject = Record<string, string>;

/**
 * Swap keys with values in objects
 */
export function kvsmFlip(obj: PlainObject) {
  const ret: PlainObject = {};
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key;
  });
  return ret;
}

// util for test

export function jsonStroify(
  input: string | PlainObject,
  trimKeyQuotation: boolean = false
) {
  let result =
    typeof input === "string" ? input : JSON.stringify(input, null, 0);
  if (trimKeyQuotation) {
    // trimKeyQuotation
    result = result.replace(/(?:"[^"]*":)/g, (word) => {
      return word.replace(/^"/i, "").replace(/":$/gi, ":");
    });
  }
  return result;
}

/**
 *
 * @sample
 * ```
 *
 * ```
 */
export function straShuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

/**
 *
 * @sample
 * ```ts
 * stroShuffle(`help boolean info help (default:false) (index:-1) (optional:true)`,4)
 * ```
 */
export function stroShuffle(prompt: string | string[], startIndex: number = 2) {
  const stda: string[] = typeof prompt === "string" ? prompt.split(/ +/) : prompt;
  const validindex = startIndex > 0 && startIndex < stda.length ? startIndex : 2;
  const tail = stda.slice(validindex);
  const head = stda.slice(0, validindex);
  return [...head, ...straShuffle(tail)].filter((v) => v).join(" ");
}

// apis
export { stroUtxtParse as parse };
