[![npm version](https://badge.fury.io/js/babel-plugin-after-async-component.svg)](https://badge.fury.io/js/babel-plugin-after-async-component)

# babel-plugin-after-async-component

Babel plugin to add additional chunk info to asyncComponent() in Afterjs.

## Example

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
  chunkName: "AfterChunk-pages-ProducDetail",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'AfterChunk-pages-ProducDetail' */
        `./pages/ProducDetail`
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

- _`prefix`_: string (defaults: AfterChunk-)  String used to append before chunkname and webpackChunkName.

```json
{
  "plugins": ["after-async-component", { "prefix": "AfterChunk-" }]
}
```

### Via CLI

```sh
$ babel --plugins after-async-component script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["after-async-component"]
});
```
