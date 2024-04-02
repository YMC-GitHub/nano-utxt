import { transform } from "./main";
import { jsonStroify } from "@utxt/stro-parse";

describe(`objm - to - objf`, () => {
  test("directly", () => {
    // name,value,
    let prompt: string = "";
    prompt = "help boolean info help (default:false)";
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{help:false}`);
  });
  test("name starts with - ? done", () => {
    // name,value,
    let prompt: string = "";
    prompt = "--help boolean info help (default:false)";
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{help:false}`);
  });
  test("more than one name ? done", () => {
    // name,value,
    let prompt: string = "";
    prompt = "-h,--help boolean info help (default:false)";
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{h:false,help:false}`);
  });
  test("camelize key ? done", () => {
    // name,value,
    let prompt: string = "";
    prompt = "--ns-sep string set ns split char (default:.)";
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{nsSep:"."}`);
  });
  test("to use identy name ? close keyCamelize", () => {
    // name,value,
    let prompt: string = "";
    prompt = "--ns-sep string set ns split char (default:.)";
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true, keyCamelize: false });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{ns-sep:"."}`);
  });

  test("ucase - help,version? done", () => {
    // name,value,
    let prompt: string = "";
    prompt = `
-h,--help boolean info help (default:false)
-v,--version boolean info version (default:false)
`;
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{h:false,help:false,v:false,version:false}`);
  });
  test("ucase - workspace? done", () => {
    // name,value,
    let prompt: string = "";
    prompt = `
-w,--workspace string set workspace location (default:./)
`;
    // text,objm,objf
    let objf = transform(prompt, { valueParse: true });
    // console.log(objf)
    let exp = jsonStroify(objf, true);
    // console.log(exp)
    expect(exp).toStrictEqual(`{w:"./",workspace:"./"}`);
  });
});

// $name="stro-parse";$org="utxt";$repo="ymc-github/nano-utxt";
// pnpm --filter $name run test
