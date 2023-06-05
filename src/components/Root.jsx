import { Outlet } from "react-router-dom";

import Header from "./Header";
function Root() {
	return (
		<>
			<Header />
			<div className="content">
				<Outlet />
			</div>
		</>
	);
}

export default Root;
