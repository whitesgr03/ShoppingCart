import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

const Root = () => {
	const [cartList, setCartList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const handleToggleModal = value => setShowModal(value);

	return (
		<>
			<Header />
			<div data-testid="content" className={"content"}>
				<Outlet />
				<Footer />
			</div>
			<Modal
				cartList={cartList}
				showModal={showModal}
				onToggleModal={handleToggleModal}
			/>
		</>
	);
};

export { Root as default };
