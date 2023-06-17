import Root from "./components/Root";
import Home from "./components/Home";
import Shop, { Products, ProductInfo } from "./components/Shop";

import Error from "./components/Error";

import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
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
			},
		],
	},
]);

export default RouteSwitch;
