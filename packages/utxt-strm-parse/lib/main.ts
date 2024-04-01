// a library package to parse nano-utxt-strm

// recommended-lib-name:nano-utxt-strm-parse

import { parse as stroparse } from "@utxt/stro-parse";
import type { UtxtObjo } from "@utxt/stro-parse";
export type UtxtObjm = UtxtObjo[];

// util
export function utxtStrmArrify(strm: string | string[], strict?: boolean) {
  let list: string[] = Array.isArray(strm) ? strm : strm.split(/\r?\n/);
  // code(core): only-start with slug label ? strict
  if (strict) {
    list = list.filter((v) => /^ *-/i.test(v));
  }
  // code(core): ignore-empty ? done
  list = list.map((v) => v.trim()).filter((v) => v);
  return list;
}

// apis
/**
 * parse nano-utxt-strm to utxt.objm,utxt.json
 * @psample
 * ```
 * let strm = '-h,--help boolean info help (default:false) (index:-1) (optional:true)'
 * let objm = utxtStrmParse(strm)
 * // [{name:"-h,--help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}]
 * ```
 */
export function utxtStrmParse(
  strm: string | string[],
  keys?: string
): UtxtObjm {
  let list: string[] = utxtStrmArrify(strm);
  return list.map((stro) => stroparse(stro, keys));
}
export { utxtStrmParse as parse };
