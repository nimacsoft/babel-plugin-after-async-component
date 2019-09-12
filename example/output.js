import { asyncComponent } from "@jaredpalmer/after"
import { asyncComponent as asyncLoad } from "@jaredpalmer/after"
import loader from "@jaredpalmer/after/asyncComponent"
const name = "random-name"
const a = [
  {
    path: "/",
    exact: true,
    component: loader(
      {
        loader: () =>
          import(
            /* webpackChunkName: 'mmd' */
            `./pages/Home`
          ),
      },
      "mmd"
    ),
  },
  {
    path: "/product/:name",
    component: asyncComponent(
      {
        loader: () =>
          import(
            /* webpackChunkName: 'pages-ProducDetail' */
            `./pages/ProducDetail`
          ),
      },
      "pages-ProducDetail"
    ),
  },
  {
    component: asyncComponent(
      {
        loader: () =>
          import(
            /* webpackChunkName: '[request]' */
            `./pages/${FILE}`
          ),
      },
      FILE
    ),
  },
]
const b = {
  path: "/",
  exact: true,
  component: asyncLoad(
    {
      loader: () =>
        import(
          /* webpackChunkName: 'pages-Home' */
          `./pages/Home`
        ),
    },
    "pages-Home"
  ),
}
const c = {
  path: "/",
  exact: true,
  component: asyncComponent(
    {
      loader: () =>
        import(
          /* webpackChunkName: 'Bisar' */
          `./Home`
        ),
    },
    "Bisar"
  ),
}
