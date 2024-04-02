// a library package for utxt to pick utxt-strm

// recommended-lib-name:nano-utxt-strm-filter-pick,utxt-strm-pick

/**
 *
 * @sample
 * ```ts
 * pick(usage(),'*commitlog filter*')
 * ```
 */
export function pick(text: string, rule: string) {
  // log(`[info] usage filter`, rule)
  return text
    .split(/\r?\n/)
    .filter((line) => isStroInRule(line, rule))
    .join("\n");
}

// util
/**
 *
 * @sample
 * ```ts
 * isStroInRule('src/xx','*commitlog filter*')
 * ```
 */
export function isStroInRule(stro: string, rule: string) {
  // feat(core): regard them as regexp when including *
  // feat(core): split them with ,
  // feat(core): ignore empty space in them

  if (!rule) return false;

  // idea(core): allow rule as string array and regexp or rexexp[] (todo)
  // them:stro-to-stra -> trim-space -> ignore-empty
  let input: string[] = rule
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v);

  // stro in rule-rega?
  let isMagicRule = rule.indexOf("*") >= 0;
  if (isMagicRule) {
    // feat(core): regard * as .*
    let inputReg = input
      .map((v) => v.replace(/\*/g, ".*"))
      .map((v) => new RegExp(`${v}`));
    // .map((v) => new RegExp(`^${v}`));

    // console.log(inputReg)
    // list = list.filter(vl => !inputReg.some(reg => reg.test(vl)))
    return inputReg.some((reg) => reg.test(stro));
  }
  // stro in rule-stra ?
  return input.includes(stro);
}

// util for test,rule
export function stroNameToRule(
  stro: string = "help,version,workspace",
  star: string = "*"
) {
  return stro
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v)
    .map((v) => `${star}${v}`)
    .join(",");
}

// a library package for utxt to omit utxt-strm

// recommended-lib-name:nano-utxt-strm-filter-omit,utxt-strm-omit

/**
 *
 * @sample
 * ```ts
 * omit(usage(),'*commitlog filter*')
 * ```
 */
export function omit(text: string, rule: string) {
  // log(`[info] usage filter`, rule)
  return text
    .split(/\r?\n/)
    .filter((line) => !isStroInRule(line, rule))
    .join("\n");
}
