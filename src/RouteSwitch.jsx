import Root from "./components/Root";
import Home from "./components/Home";
import Shop, { Products, ProductInfo } from "./components/Shop";
import Contact from "./components/Contact";

import Error from "./components/Error";

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
				element: <Shop />,
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: ":productId",
						element: <ProductInfo />,
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
