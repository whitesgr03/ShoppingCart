import Root from "./components/Root";
import { createBrowserRouter } from "react-router-dom";

const RouteSwitch = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
]);

export default RouteSwitch;
