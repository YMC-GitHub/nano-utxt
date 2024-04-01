import { utxtStrmParse } from "./main";
import { jsonStroify } from "@utxt/stro-parse";
import type { UtxtObjo } from "@utxt/stro-parse";

let act: UtxtObjo[] = [];
act = [
  {
    name: "-h,--help",
    value: "false",
    type: "boolean",
    desc: "info help",
    index: "-1",
    optional: "true",
  },
  {
    name: "-v,--version",
    value: "false",
    type: "boolean",
    desc: "info help",
    index: "-1",
    optional: "true",
  },
];

describe(`utxt - strm - parse`, () => {
  test("plain", () => {
    let prompt: string = "";
    prompt = `
-h,--help boolean info help (default:false) (index:-1) (optional:true)
-v,--version boolean info help (default:false) (index:-1) (optional:true)
`;

    const objm: UtxtObjo[] = utxtStrmParse(prompt);
    console.log(jsonStroify(objm, true));
    objm.forEach((objo, index) => {
      expect(jsonStroify(objo)).toStrictEqual(jsonStroify(act[index]));
    });
  });

  test("short", () => {
    let prompt: string = "";
    prompt = `
-h,--help boolean info help (default:false)
-v,--version boolean info help (default:false)
`;
    const objm: UtxtObjo[] = utxtStrmParse(prompt);
    // console.log(jsonStroify(objm, true));
    objm.forEach((objo, index) => {
      expect(jsonStroify(objo)).toStrictEqual(jsonStroify(act[index]));
    });
  });

  test("shuffle", () => {
    let prompt: string = "";
    prompt = `
    -h,--help boolean info help (index:-1) (optional:true) (default:false) 
    -v,--version boolean info help (index:-1) (optional:true) (default:false) 
`;
    const objm: UtxtObjo[] = utxtStrmParse(prompt);
    // console.log(jsonStroify(objm, true));
    objm.forEach((objo, index) => {
      expect(jsonStroify(objo)).toStrictEqual(jsonStroify(act[index]));
    });
  });
});

// $name="stro-parse";$org="utxt";$repo="ymc-github/nano-utxt";
// pnpm --filter $name run test
