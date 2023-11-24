import App from "./components/App";
import Home from "./components/Home";
import Products from "./components/products/Products";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
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
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "shop",
					element: <Products />,
					children: [
						{
							index: true,
							element: <ProductList />,
						},
						{
							path: ":productId",
							element: (
								<AuthGuard>
									<ProductDetails />
								</AuthGuard>
							),
						},
					],
				},
				{
					path: "contact",
					element: <Contact />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Root;
