import Root from "./components/Root";
import Home from "./components/Home"; // { HomeLoader, rootAction }
import Products from "./components/Products";

import Error from "./components/Error";
import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "products",
				element: <Products />,
			},
		],
	},
]);

export default RouteSwitch;
