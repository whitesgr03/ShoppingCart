import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import RouteSwitch from "./RouteSwitch";
import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={RouteSwitch} />
	</React.StrictMode>
);
