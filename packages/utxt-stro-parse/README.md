# @utxt/stro-parse

a package library for utxt to parse stro

## User installing

- You can import directly via npm cdn

```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/@utxt/stro-parse@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool

```bash
npm i @utxt/stro-parse
```

```bash
yarn add @utxt/stro-parse
```

```bash
pnpm add @utxt/stro-parse
```

```ts
import { parse } from "@utxt/stro-parse";
parse(`help boolean info help (default:false) (index:-1) (optional:true)`);

// {name:'help',type:'boolean',desc:'info help ',value:'false',index:'-1',optional:'true'}
```

## Product Closed Loop

Small, single function, only do one thing - parse utxt-stro

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

It can be assembled from smalle library packages such as kvse and kvsm, but does not split and reference for the time being in order to maintain zero dependency.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.

## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.
