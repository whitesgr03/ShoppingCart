import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Root = () => {
	return (
		<>
			<Header />
			<div data-testid="content" className={"content"}>
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export { Root as default };
