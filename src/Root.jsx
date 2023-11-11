import App from "./components/App";
import Home from "./components/Home";
import ShopPage from "./components/products/ShopPage";
import ProductList from "./components/products/ProductList";
import SingleProductPage from "./components/products/SingleProductPage";
import Contact from "./components/Contact";
import AuthGuard from "./components/AuthGuard";
import NotFound from "./components/NotFound";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Root = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			errorElement: <NotFound />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Root;
