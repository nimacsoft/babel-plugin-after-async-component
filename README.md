[![npm version](https://badge.fury.io/js/babel-plugin-after-async-component.svg)](https://badge.fury.io/js/babel-plugin-after-async-component)

# babel-plugin-after-async-component

Babel plugin to add additional chunk info to asyncComponent() in Afterjs.

## How It's Wokring

1. search for import statements from these paths `'@jaredpalmer/after'` and `'@jaredpalmer/after/asyncComponent'`
2. then it finds a local name for `asyncComponent` import statement

```javascript
// e1.js
import { asyncComponent } from "@jaredpalmer/after" // localname is asyncComponent

// e2.js
import { asyncComponent as foo } from "@jaredpalmer/after" // localname is foo

// e3.js
import asyncComponent from "@jaredpalmer/after/asyncComponent" // localname is asyncComponent

// e4.js
import foo from "@jaredpalmer/after/asyncComponent" // localname is foo

// e5.js
import { asyncComponent as foo, After } from "@jaredpalmer/after" // localname is foo

// e6.js
import { After } from "@jaredpalmer/after" // there is no `asyncComponent` import so babel plugin skips this file

// e7.js
import loader from "@jaredpalmer/after/asyncComponent" // localname is loader
import { asyncComponent, After } from "@jaredpalmer/after" // localname is asyncComponent

// localname = [`loader`, `asyncComponent`] :)
```

2. then it searches for FunctionCalls that have these conditions: 
  1) name of function that get called matches localname array 
  2) that function act as value of property 
  3) the name of property must be `component`

```javascript
import { asyncComponent } from '@jaredpalmer/after'; // localname is asyncComponent

// let's look for localname (`asyncComponent`) and see where it get called
// ...

// oh nice I found a call to that function
{
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  }),
}

// now let me check and see if it's value of an object propery that named `component`
{ // <- it's an object
  // 👇 and property name is `component`
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  })
}
```

## Examples

**In**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/ProducDetail`
      )
  })
}
```

**Out**

```js
{
  path: "/product/:name",
  chunkName: "pages-ProducDetail",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'pages-ProducDetail' */
        `./pages/ProducDetail`
      )
  })
}

// 👆 as you can see `./pages/ProducDetail` changed to `pages-ProducDetail`,
// because for web servers `/` means a folder
// and webpackChunkName is name of file that saved on disk,
// so `/` in file name may break our app
```

**In**

```js
{
  path: "/product/:name",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'HelloWorld' */
        `./pages/ProducDetail`
      )
  })
}
```

**Out**

```js
{
  path: "/product/:name",
  chunkName: "HelloWorld",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'HelloWorld' */
        `./pages/ProducDetail`
      )
  })
}
```

**In**

```js
const name = "SlimShady"
{
  path: "/rap/god",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/${name}`
      )
  })
}
```

**Out**

```js
const name = "SlimShady"
{
  path: "/rap/god",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/${name}`
      )
  })
}
```

👆 did you notice that it's not working with the above example ?
in this kind of situation you have to name that chunk your self

### HOW ?

add `chunkName` property and a magic comment

From:

```javascript
const name = "SlimShady"
{
  path: "/rap/god",
  component: asyncComponent({
    loader: () =>
      import(
        `./pages/${name}`
      )
  })
}
```

To:

```javascript
const name = "SlimShady"
{
  path: "/rap/god",
  chunkName: name, // <-
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: "[request]" */ // <-
        `./pages/${name}`
      )
  })
}
```

## Installation

```sh
$ npm install babel-plugin-after-async-component --save-dev
```

or if you use Yarn like me:

```sh
$ yarn add -D babel-plugin-after-async-component
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["after-async-component"]
}
```

#### Options

- _`prefix`_: string (defaults: "") String used to append before `chunkName` and `webpackChunkName`.

```json
{
  "plugins": ["after-async-component", { "prefix": "MyPrefix-" }]
}
```

### Via CLI

```sh
$ babel --plugins after-async-component script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["after-async-component"],
})
```
