import {
  stroKvseRegify,
  stroKvseMatch,
  stroKvseParse,
  stroUtxtParse,
  jsonStroify,
  stroShuffle,
  kvsmFromKvso,
} from "./main";

describe(`utxt - stro - kvse - regify`, () => {
  test("small off", () => {
    expect(stroKvseRegify()).toStrictEqual(/\(default:.*\)/i);
    expect(stroKvseRegify("type")).toStrictEqual(/\(type:.*\)/i);
    expect(stroKvseRegify("index")).toStrictEqual(/\(index:.*\)/i);
    expect(stroKvseRegify("optional")).toStrictEqual(/\(optional:.*\)/i);
  });
  test("small on", () => {
    const small: boolean = true;
    expect(stroKvseRegify(undefined, small)).toStrictEqual(
      /\(default:[^)]*\)/i
    );
    expect(stroKvseRegify("type", small)).toStrictEqual(/\(type:[^)]*\)/i);
    expect(stroKvseRegify("index", small)).toStrictEqual(/\(index:[^)]*\)/i);
    expect(stroKvseRegify("optional", small)).toStrictEqual(
      /\(optional:[^)]*\)/i
    );
  });
});

describe(`utxt - stro - kvse - match`, () => {
  test("only one kvse in prompt ? small off or on", () => {
    // name,value,
    expect(
      stroKvseMatch("help boolean info help (default:false)")
    ).toStrictEqual(`(default:false)`);
    expect(
      stroKvseMatch("help boolean info help (index:-1)", "index")
    ).toStrictEqual(`(index:-1)`);
    expect(
      stroKvseMatch("help boolean info help (optional:true)", "optional")
    ).toStrictEqual(`(optional:true)`);
    expect(
      stroKvseMatch("help boolean info help (type:string)", "type")
    ).toStrictEqual(`(type:string)`);
  });
  test("more than one kvse in prompt ? small on", () => {
    let prompt: string = "";
    prompt =
      "help boolean info help (default:false) (index:-1) (optional:true)";
    const small: boolean = true;
    expect(stroKvseMatch(prompt, "default", small)).toStrictEqual(
      `(default:false)`
    );
    expect(stroKvseMatch(prompt, "index", small)).toStrictEqual(`(index:-1)`);
    expect(stroKvseMatch(prompt, "optional", small)).toStrictEqual(
      `(optional:true)`
    );
  });
});

describe(`utxt - stro - kvse - parse`, () => {
  test("more than one kvse in prompt ? done", () => {
    let prompt: string = "";
    const small: boolean = true;
    prompt =
      "help boolean info help (default:false) (index:-1) (optional:true)";
    expect(stroKvseParse(prompt, "default", small).value).toStrictEqual(
      `false`
    );
    expect(stroKvseParse(prompt, "index", small).value).toStrictEqual(`-1`);
    expect(stroKvseParse(prompt, "optional", small).value).toStrictEqual(
      `true`
    );

    // empty value, string value with wrap
    prompt = 'help boolean info help (default:",") (index:-1) (optional:)';
    expect(stroKvseParse(prompt, "default", small).value).toStrictEqual(`","`);
    expect(stroKvseParse(prompt, "index", small).value).toStrictEqual(`-1`);
    expect(stroKvseParse(prompt, "optional", small).value).toStrictEqual(``);
  });
  test("use empty value ? done", () => {
    let prompt: string = "";
    const small: boolean = true;
    prompt = 'help boolean info help (default:",") (index:-1) (optional:)';
    expect(stroKvseParse(prompt, "optional", small).value).toStrictEqual(``);
  });

  test("string value with quotation and to trim quotation ? trimQuotation on", () => {
    let prompt: string = "";
    const small: boolean = true;
    const trimQuotation: boolean = true;
    prompt = 'help boolean info help (default:",") (index:-1) (optional:)';
    expect(
      stroKvseParse(prompt, "default", small, trimQuotation).value
    ).toStrictEqual(`,`);
  });
});

describe(`utxt - stro - kvsm - from kvso`, () => {
  test("prefer kvsm from kvso ? done", () => {
    const act: string = `{default:"value"}`;
    const trimKeyQuotation: boolean = true;
    expect(
      jsonStroify(kvsmFromKvso(`default:value`), trimKeyQuotation)
    ).toStrictEqual(act);
  });

  test("prefer custom sep ? done", () => {
    const act: string = `{default:"value"}`;
    const trimKeyQuotation: boolean = true;
    const sep: string = "=,";
    expect(
      jsonStroify(kvsmFromKvso(`default=value`, sep), trimKeyQuotation)
    ).toStrictEqual(act);
  });
});

describe(`utxt - stro - parse`, () => {
  test("plain", () => {
    let prompt: string = "";
    prompt =
      "help boolean info help (default:false) (index:-1) (optional:true)";
    const objo = stroUtxtParse(prompt);
    const trimKeyQuotation: boolean = true;
    const act = `{name:"help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}`;
    expect(jsonStroify(objo, trimKeyQuotation)).toStrictEqual(act);
  });
  test("shuffle", () => {
    let prompt: string = "";
    prompt =
      "help boolean info help (default:false) (index:-1) (optional:true)";
    // let stra:string[]=`(default:false) (index:-1) (optional:true)`.split(/ +/)
    // straShuffle(stra)
    // prompt=['help boolean info help',...stra].join(' ')
    prompt = stroShuffle(prompt, 4);
    const objo = stroUtxtParse(prompt);
    const trimKeyQuotation: boolean = true;
    const act = `{name:"help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}`;
    expect(jsonStroify(objo, trimKeyQuotation)).toStrictEqual(act);
  });
  test("short", () => {
    let prompt: string = "";
    prompt = "help boolean info help (default:false)";
    const objo = stroUtxtParse(prompt);
    const trimKeyQuotation: boolean = true;
    const act = `{name:"help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}`;
    expect(jsonStroify(objo, trimKeyQuotation)).toStrictEqual(act);
  });
  // test("alias - prefer value to default? todo", () => {
  //   let prompt:string="";
  //   prompt= 'help boolean info help (value:false) (index:-1) (optional:true)';
  //   let objo = stroUtxtParse(prompt,'value,index,optional,type')
  //   let trimKeyQuotation:boolean=true;
  //   let act=`{name:"help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}`
  //   expect(jsonStroify(objo,trimKeyQuotation)).toStrictEqual(act);
  // });
  test("custom keys ? done", () => {
    let prompt: string = "";
    prompt = "help boolean info help (value:false) (index:-1) (optional:true)";
    const objo = stroUtxtParse(prompt, "value,index,optional,type");
    const trimKeyQuotation: boolean = true;
    const act = `{name:"help",value:"false",type:"boolean",desc:"info help",index:"-1",optional:"true"}`;
    expect(jsonStroify(objo, trimKeyQuotation)).toStrictEqual(act);
  });
});

// $name="stro-parse";$org="utxt";$repo="ymc-github/nano-utxt";
// pnpm --filter $name run test
