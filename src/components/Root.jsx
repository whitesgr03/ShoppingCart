import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

const Root = () => {
	return (
		<>
			<Header />
			<div data-testid="content" className={"content"}>
				<Outlet />
				<Footer />
			</div>
			<Modal
			/>
		</>
	);
};

export { Root as default };
