import { asyncComponent } from "@jaredpalmer/after"
import { asyncComponent as asyncLoad } from "@jaredpalmer/after"
import loader from "@jaredpalmer/after/asyncComponent"

const a = [
	{
		path: "/",
		exact: true,
		component: loader({
			loader: () => import(/* webpackChunkName: "nima" */`./pages/Home`),
		}),
	},
	{
		path: "/product/:name",
		component: asyncComponent({
			loader: () =>
				import(
					`./pages/ProducDetail`
				),
		}),
	},
	{
		component: asyncComponent({
			loader: () =>
				import(`./pages/${asd}`),
		}),
	},
]

const b = 	{
	path: "/",
	exact: true,
	component: asyncLoad({
		loader: () => import(`./pages/Home`),
	}),
}

const c = 	{
	path: "/",
	exact: true,
	component: asyncComponent({
		loader: () => import(`./Home`),
	}),
}