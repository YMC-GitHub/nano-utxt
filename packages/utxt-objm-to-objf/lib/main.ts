// a library package to convet utxt-objm to utxt-objf

// recommended-lib-name:nano-utxt-objm-to-objf
import { parse } from "@utxt/strm-parse";
import type { UtxtObjm } from "@utxt/strm-parse";

// pnpm add nano-strv-parse
import { StrvParse as strvparse } from "nano-strv-parse";

// pnpm add nano-jssv-check
import { jssvcheck } from "nano-jssv-check";

// code(core): interface defined for transfrom option
export type valueparseFuncLike = (
  value: string,
  type: string,
  desc?: string
) => string | number | boolean | null | undefined;
export type camelizeFuncLike = (...args: any[]) => string;
export interface ObjmTransformOption {
  valueParse: boolean | valueparseFuncLike;
  keyCamelize: boolean | camelizeFuncLike;
}

// code(core): interface defined for transfrom option-like
export type ObjmTransformOptionLike = Partial<ObjmTransformOption>;

// code(core): builtin-option defined for transfrom option
export const builtinOption: ObjmTransformOption = {
  valueParse: false,
  keyCamelize: true,
};

// code(core): func defined for transfrom yo custom option easily

/**
 *
 * @sample
 * ```ts
 * import type {ObjmTransformOption} from "@utxt/objm-to-objf";
 * import {builtinOption,conf} from "@utxt/objm-to-objf";
 * let option:ObjmTransformOption  = conf({},builtinOption)
 * ```
 */
export function conf(custom?: object, def?: object): any {
  return { ...(def ? def : {}), ...(custom ? custom : {}) };
}

// code(core): interface defined for transfrom result
export interface NanoFlagLike {
  [x: string]: string;
}

// code(core): func defined for transfrom handle
/**
 *
 * @sample
 * ```ts
 * transform(text)
 * // utxt-objm -> nano-argv ? utxt-objm -> nano-flag ?
 * ```
 */
export function transform(
  prompt: string | UtxtObjm,
  transformOption?: ObjmTransformOptionLike
) {
  let result: NanoFlagLike = {};
  let objm = typeof prompt == "string" ? parse(prompt) : prompt;

  let option: ObjmTransformOption = conf(transformOption, builtinOption);
  // clone objm
  let cloned = [...objm];

  // use identy as default func
  let camelizeFunc = getCustomHandle(option.keyCamelize, identy);
  let valueparse = getCustomHandle(option.valueParse, identy);

  // use identy to keep package small ? no
  camelizeFunc = getCustomHandle(option.keyCamelize, camelize);
  valueparse = getCustomHandle(option.valueParse, strvparsesafe);

  for (let index = 0; index < cloned.length; index++) {
    const objo = cloned[index];
    let { name, value, type } = objo;
    let nl = utxtStroNameStd(name);

    // idea(core): pass value-parse to parse value (todo)
    let parsedvalue = option.valueParse ? valueparse(value, type) : value;
    for (let j2 = 0; j2 < nl.length; j2++) {
      let nj = nl[j2];
      // idea(core): pass key-camelize to camelize key (todo)
      if (option.keyCamelize) {
        // nj = nj;//1.0
        //nj =  camelize(nj);// 2.0
        nj = camelizeFunc(nj); //3.0
      }
      result[nj] = parsedvalue;
    }
  }
  return result;
}

// util

/**
 *
 * utxt - stro - name -std
 * @sample
 * ```ts
 * stroNameStd(`-w,--workspace`) //['w','workspace']
 *
 * stroNameStd(`w,workspace`) //['w','workspace']
 *
 * stroNameStd(`  w,workspace  `) //['w','workspace']
 *
 * stroNameStd(`  ,,,w,workspace  `) //['w','workspace']
 * ```
 */
export function utxtStroNameStd(name: string | string[]) {
  // str-to-arr
  let stra = typeof name === "string" ? name.split(/,/) : name;
  // trim space and del start slug -
  stra = stra.map((i) => i.trim().replace(/^-*/gi, ""));

  // ignore-empty
  stra = stra.filter((v) => v);
  return stra;
}

/**
 * utxt - stro - name get one - short or long - in name
 * @sample
 * ```
 * // '-n,--name' -> 'name'
 * // '-n' -> 'n'
 * utxtStroNameGetOne('-n,--name')
 * ```
 */
export function utxtStroNameGetOne(name: string | string[]) {
  const [s, l] = utxtStroNameStd(name);
  // 'hasLong' is assigned a value but never used
  const thelong = s.length > 1 ? s : l;
  // thelong = camelize(thelong)
  return thelong;
}

// todo: use slugify,camelize from nano-stre
/**
 *
 * @sample
 * ```
 * humanize('per_page')// Per page
 * humanize('per-page')// Per page
 * ```
 * @description
 * ```
 * ## idea
 * - [x] replace multi - or _ to one space
 * - [x] add space to the char that is uppercase and is not the first index
 * - [x] the first char to upper ,other lowercase
 * ```
 */
export function humanize(s: string) {
  return s
    .replace(/(?:^\w|[A-Z_-]|\b\w)/g, (word, index) => {
      let res = "";
      // log(word, index); //desc: for debug
      // feat: replace multi - or _ to one space
      res = word.replace(/[-_]+/g, " ");
      // feat: add space to the char that is uppercase and is not the first index
      res = index !== 0 ? res.replace(/[A-Z]/, " $&") : res;
      // feat: the first char to upper ,other lowercase
      return index === 0 ? res.toUpperCase() : res.toLowerCase();
    })
    .replace(/\s+/g, " ");
}

export function camelize(s: string) {
  return humanize(s)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
}

export function slugify(s: string) {
  return humanize(s)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toLowerCase())
    .replace(/\s+/g, "-");
}

export function strvparsesafe(value: string, type: string, desc?: string) {
  let result = strvparse(value, type);
  if (!jssvcheck(result, type)) {
    throw new Error(desc ? desc : `expect ${result} to type ${type}`);
  }
  return result;
}

export function identy<T>(v: T) {
  return v;
}

// function isFunc(key:unknown){
//   return typeof key==="function"
// }
export function getCustomHandle<T>(
  k: unknown,
  fallback: (...args: any[]) => T
) {
  return typeof k === "function" ? k : fallback;
}
