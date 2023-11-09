import App from "./components/App";
import Home from "./components/Home";
import ShopPage from "./components/products/ShopPage";
import ProductList from "./components/products/ProductList";
import SingleProductPage from "./components/products/SingleProductPage";
import Contact from "./components/Contact";
import AuthGuard from "./components/AuthGuard";
import Error from "./components/Error";
import NotFoundPage from "./components/NotFoundPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Root = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			errorElement: <NotFoundPage />,
			children: [
				{
					errorElement: <Error />,
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
					],
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Root;
