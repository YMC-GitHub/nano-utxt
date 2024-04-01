// a library package to parse simple string value to js value

// recommended-lib-name:strv-parse,nano-strv-parse

// text value - for short txtv,vtxt,strv

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * parse cli input to node.js boolean,number,null,undefined,string
 * @sample
 * ```ts
 * StrvParse('true') // true
 * StrvParse('false') // false
 * StrvParse('1') // 1
 * StrvParse('null') // null
 * StrvParse('undefined') // undefined
 * StrvParse('zero') // 'zero'
 * StrvParse('1','string') // '1'
 * StrvParse(1,'string') // '1'
 * // why use ?
 * // parse value of usage objo
 * ```
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function StrvParse(thing: any, type: string = "") {
  if (type === "string") {
    return String(thing);
  }
  // case:  exp for true. eg: true-string or true-boolean ( or other custom exp(todo))
  // if (isOneOfThem(thing, ['true', true])) {
  //     return true
  // }

  if ([true].includes(thing) || strIsOneOfThem(thing, ["true"])) {
    return true;
  }

  // case:  exp for false.
  // if (isOneOfThem(thing, ['false', false])) {
  //     return true
  // }
  if ([false].includes(thing) || strIsOneOfThem(thing, ["false"])) {
    return false;
  }

  // case:  exp for number.
  if (Number(thing)) {
    return Number(thing);
  }

  if ([null].includes(thing) || strIsOneOfThem(thing, ["null"])) {
    return null;
  }

  if ([undefined].includes(thing) || strIsOneOfThem(thing, ["undefined"])) {
    return undefined;
  }

  // case: other string
  return String(thing);
}

function strIsOneOfThem(one: string, them: string[] = []) {
  let reg = new RegExp(`^${one}$`, "i");
  return them.some((v) => reg.test(v));
}
