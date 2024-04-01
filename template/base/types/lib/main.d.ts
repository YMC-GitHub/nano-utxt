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
export declare function StrvParse(thing: any, type?: string): string | number | boolean | null | undefined;
