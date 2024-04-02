import { isStroInRule, pick, stroNameToRule, omit } from "./main";

import {
  utxtStrmPresetBase,
  utxtStrmPresetEditjson,
  utxtStrmPresetCode,
  utxtStrmPresetFeat,
} from "./strm-preset";

let strm: string = "";
strm = [
  utxtStrmPresetBase,
  utxtStrmPresetEditjson,
  utxtStrmPresetCode,
  utxtStrmPresetFeat,
]
  .map((fn) => fn().trim())
  .join("\n");

// rest-style utxt ?
// yours  edit-json put --name name --value zero
// yours  edit-json post --name name --value zero
// yours  edit-json get --name name
// yours  edit-json delete --name

describe(`stro - is stro in rule`, () => {
  test("base", () => {
    let stro: string = "";
    let rule: string = "";
    stro = "src/xx";
    rule = "src/txt";
    // isOneOfThem('src/xx','*commitlog filter*')
    expect(isStroInRule(stro, rule)).toStrictEqual(false);
    expect(isStroInRule(stro, `src/xxxx`)).toStrictEqual(false);
    expect(isStroInRule(stro, `src/xx`)).toStrictEqual(true);
  });

  test("rule with * ? done", () => {
    let stro: string = "";
    let rule: string = "";
    stro = "src/xx";
    rule = "*commitlog filter*";
    stro = `--cmtl-feat string commitlog filter set feat name (default:feat,docs,build,chore,test,fix)`;
    expect(isStroInRule(stro, rule)).toStrictEqual(true);
    expect(isStroInRule(stro, "cmt")).toStrictEqual(false);
    expect(isStroInRule(stro, "*cmt")).toStrictEqual(true);
    expect(isStroInRule(stro, "*cmt*")).toStrictEqual(true);
  });
});

describe(`stro - name to rule`, () => {
  test("base", () => {
    expect(stroNameToRule("help,version,workspace", "*")).toStrictEqual(
      `*help,*version,*workspace`
    );
  });
});

describe(`utxt - strm - pick`, () => {
  test("base", () => {
    let base: string = "";
    // base = pick(strm,'*-h,*-v')
    let rule: string = "";
    rule = stroNameToRule("help,version,workspace", "*");
    base = pick(strm, rule);
    // console.log(base)
    expect(base).toStrictEqual(utxtStrmPresetBase().trim());
  });

  test("editjson", () => {
    let base: string = "";
    // base = pick(strm,'*-h,*-v')
    let rule: string = "";
    rule = stroNameToRule("editjson", "*");
    base = pick(strm, rule);
    // console.log(base)
    expect(base).toStrictEqual(utxtStrmPresetEditjson().trim());
  });

  test("code", () => {
    let base: string = "";
    // base = pick(strm,'*-h,*-v')
    let rule: string = "";
    rule = stroNameToRule("code", "*");
    base = pick(strm, rule);
    // console.log(base)
    expect(base).toStrictEqual(utxtStrmPresetCode().trim());
  });
  test("feat - omit ? done", () => {
    let base: string = "";
    // base = pick(strm,'*-h,*-v')
    let rule: string = "";
    rule = stroNameToRule("in feat", "*");
    base = pick(strm, rule);
    // console.log(base)
    let opts:string = omit(utxtStrmPresetFeat().trim(), stroNameToRule("demo,usage,alias,cmd,option", "*"))
    expect(base).toStrictEqual(opts);

    // console.log(typeof /name/i)
    // expect(base).toStrictEqual();
  });
});
