import Root from "./App/Root";

import Home from "./components/Home";

import ShopPage from "./components/products/ShopPage";
import ProductList from "./components/products/ProductList";
import SingleProductPage from "./components/products/SingleProductPage";

import Contact from "./components/Contact";

import AuthGuard from "./App/AuthGuard";

import Error from "./App/Error";

import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
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
						element: (
							<AuthGuard>
								<SingleProductPage />,
							</AuthGuard>
						),
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
