import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "../components/modals/Modal";

import RootProvider from "./RootContext";

const Root = () => {
	return (
		<>
			<RootProvider>
				<Header />
				<div data-testid="content" className={"content"}>
					<Outlet />
					<Footer />
				</div>
				<Modal />
			</RootProvider>
		</>
	);
};

export { Root as default };
