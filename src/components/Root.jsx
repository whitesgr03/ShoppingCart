import { useState, useReducer } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

import cartReducer from "./cartsReducer";

const Root = () => {
	const [cartList, dispatch] = useReducer(cartReducer, []);
	const [showModal, setShowModal] = useState("");
	const [latestItem, setLatestItem] = useState(false);

	const handleAddItem = item => {
		dispatch({
			type: "added",
			item,
		});
	};

	const handleChangeItem = item => {
		dispatch({
			type: "changed",
			item,
		});
	};

	const handleDeleteItem = cartId => {
		dispatch({
			type: "deleted",
			id: cartId,
		});
	};

	const handleToggleModal = value => setShowModal(value);

	return (
		<>
			<Header cartList={cartList} onToggleModal={handleToggleModal} />
			<div data-testid="content" className={"content"}>
				<Outlet
					context={{
						onAddItem: handleAddItem,
						onToggleModal: handleToggleModal,
						onSetLatestItem: setLatestItem,
					}}
				/>
				<Footer />
			</div>
			<Modal
				cartList={cartList}
				showModal={showModal}
				latestItem={latestItem}
				onToggleModal={handleToggleModal}
				onChangeItem={handleChangeItem}
				onRemoveItem={handleDeleteItem}
				onSetLatestItem={setLatestItem}
			/>
		</>
	);
};

export { Root as default };
