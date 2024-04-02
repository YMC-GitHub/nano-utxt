# @utxt/objm-to-objf

a package library for utxt to convert objm to objf, objf likes nano.flag 

## User installing

- You can import directly via npm cdn

```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/@utxt/objm-to-objf@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool

```bash
npm i @utxt/objm-to-objf
```

```bash
yarn add @utxt/objm-to-objf
```

```bash
pnpm add @utxt/objm-to-objf
```

```ts
import { transform } from "@utxt/objm-to-objf";
let objf = transform(`-h,--help boolean info help (default:false) (index:-1) (optional:false)`);
// {help:false,h:false}
```

## Product Closed Loop

Small, single function, only do one thing - convert utxt-objm to utxt-objf, utxt-objf likes nano-flag 

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.

## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.
