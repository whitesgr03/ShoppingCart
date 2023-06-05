import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function Root() {
	return (
		<>
			<Header />
			<div className="content">
				<Outlet />
				<Footer />
			</div>
		</>
	);
}

export default Root;
