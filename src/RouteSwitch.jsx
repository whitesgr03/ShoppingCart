import Root from "./components/Root";
import Home from "./components/Home"; // { HomeLoader, rootAction }
import Error from "./components/Error";
import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
		],
	},
]);

export default RouteSwitch;
