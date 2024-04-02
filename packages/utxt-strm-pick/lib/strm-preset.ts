export function utxtStrmPresetBase() {
  return `
-h,--help boolean info help (default:false)
-v,--version boolean info version (default:false)
-w,--workspace string set workspace location (default:./)
`;
}

export function utxtStrmPresetEditjson() {
  return `
--file string set file location in editjson (default:package.json)
-n,--name string set name in editjson (default:)
-v,--value string set value in editjson (default:)
-t,--type string set value to type in editjson (default:)
--ns string set ns in editjson (default:)
--ns-sep string set ns-sep in editjson (default:.)
`;
}

export function utxtStrmPresetCode() {
  return `
--utxt-loc string set utxt location in code
--code-out string set output location in code
`;
}

export function utxtStrmPresetFeat() {
  return `
usage: yours <cmd> [option]
demo: yours get-feat --file lib/main.ts --field feat --out-file CHANGELOG.FEAT.md
cmd: get-feat,feat
option:
--text string set text in feat
--file string set file location in feat
--field string set field name in feat
--out-file string set out-file location in feat
`;
}

export function utxtStrmAll() {
  return [
    utxtStrmPresetBase,
    utxtStrmPresetEditjson,
    utxtStrmPresetCode,
    utxtStrmPresetFeat,
  ]
    .map((fn) => fn().trim())
    .join("\n");
}
