import { asyncComponent } from "@jaredpalmer/after"
import { asyncComponent as asyncLoad } from "@jaredpalmer/after"
import loader from "@jaredpalmer/after/asyncComponent"
const name = "random-name"
const a = [
  {
    path: "/",
    exact: true,
    component: loader({
      loader: () =>
        import(
          /* webpackChunkName: "nima" */
          `./pages/Home`
        ),
    }),
  },
  {
    path: "/product/:name",
    chunkName: "pages-ProducDetail",
    component: asyncComponent({
      loader: () =>
        import(
          /* webpackChunkName: 'pages-ProducDetail' */
          `./pages/ProducDetail`
        ),
    }),
  },
  {
    component: asyncComponent({
      loader: () => import(`./pages/${name}`),
    }),
  },
]
const b = {
  path: "/",
  exact: true,
  chunkName: "pages-Home",
  component: asyncLoad({
    loader: () =>
      import(
        /* webpackChunkName: 'pages-Home' */
        `./pages/Home`
      ),
  }),
}
const c = {
  path: "/",
  exact: true,
  chunkName: "Home",
  component: asyncComponent({
    loader: () =>
      import(
        /* webpackChunkName: 'Home' */
        `./Home`
      ),
  }),
}
