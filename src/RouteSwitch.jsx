import Root from "./components/Root";
import Error from "./components/Error";
import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
	},
]);

export default RouteSwitch;
