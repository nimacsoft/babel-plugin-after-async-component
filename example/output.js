import { asyncComponent } from "@jaredpalmer/after";
import { asyncComponent as asyncLoad } from "@jaredpalmer/after";
import loader from "@jaredpalmer/after/asyncComponent";
const a = [{
  path: "/",
  exact: true,
  component: loader({
    loader: () => import(
    /* webpackChunkName: "nima" */
    `./pages/Home`)
  })
}, {
  path: "/product/:name",
  "chunkName": "AfterChunk-pages-ProducDetail",
  component: asyncComponent({
    loader: () => import(
    /* webpackChunkName: 'AfterChunk-pages-ProducDetail' */
    `./pages/ProducDetail`)
  })
}, {
  component: asyncComponent({
    loader: () => import(`./pages/${asd}`)
  })
}];
const b = {
  path: "/",
  exact: true,
  "chunkName": "AfterChunk-pages-Home",
  component: asyncLoad({
    loader: () => import(
    /* webpackChunkName: 'AfterChunk-pages-Home' */
    `./pages/Home`)
  })
};
const c = {
  path: "/",
  exact: true,
  "chunkName": "AfterChunk-Home",
  component: asyncComponent({
    loader: () => import(
    /* webpackChunkName: 'AfterChunk-Home' */
    `./Home`)
  })
};
