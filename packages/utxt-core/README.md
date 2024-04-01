a library package to parse simple string value to js value

## File size

file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 1.03kb | 0.48kb | 0.39kb
dist/main.js | 0.94kb | 0.42kb | 0.33kb
dist/main.min.cjs | 0.75kb | 0.44kb | 0.35kb
dist/main.min.js | 0.67kb | 0.39kb | 0.32kb
dist/main.umd.cjs | 1.41kb | 0.60kb | 0.50kb
dist/main.umd.min.cjs | 0.89kb | 0.51kb | 0.42kb

~~note: files with 'min' label do not upload.~~

## Background

There was a requirement to edit the json configuration file on the command line.

Because it is a configuration file, its structure should not be too complex! That is, its key value is some simple "json original value".

Why is there such a need?

As a developer, I often write / read some blogs, and there are some configuration files in these blogs. For some reason, some key values need to be modified the configuration file in some steps. In order to make it easier for readers to reproduce step by step. ( ~~It is faster to clone the source code directly?~~ repeat! Step by step! ).

It also allows the opener to quickly switch the configuration key value -- it can be run in batch without opening the editor.

Here is to extract one of its core functions so that it supports references in a variety of js environments
## Features

- parse simple string value to js value
- support js primitive value as input

## User installing

- You can import directly via npm cdn
```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/nano-strv-parse@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool
```bash
npm i nano-strv-parse
```

```bash
yarn add nano-strv-parse
```

```bash
pnpm add nano-strv-parse
```

```ts
import {StrvParse} from 'nano-strv-parse'
StrvParse('true') // true
StrvParse('false') // false
StrvParse('1') // 1
StrvParse('null') // null
StrvParse('undefined') // undefined
StrvParse('zero') // 'zero'
StrvParse('1','string') // '1'
StrvParse(1,'string') // '1'
```

## Product Closed Loop

Small, single function, only do one thing - parse simple string value to js value

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.


## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.

