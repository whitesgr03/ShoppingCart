import Root from "./App/Root";

import Home from "./components/Home";

import ShopPage from "./components/products/ShopPage";
import ProductList from "./components/products/ProductList";
import SingleProductPage from "./components/products/SignProductPage";

import Contact from "./components/Contact";

import Error from "./App/Error";

import { createHashRouter } from "react-router-dom";

const RouteSwitch = createHashRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "shop",
				element: <ShopPage />,
				children: [
					{
						index: true,
						element: <ProductList />,
					},
					{
						path: ":productId",
						element: <SingleProductPage />,
					},
				],
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "*",
				element: <Error />,
			},
		],
	},
]);

export default RouteSwitch;
