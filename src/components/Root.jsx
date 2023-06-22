import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

const Root = () => {
	const [cartList, setCartList] = useState([]);
	const [showModal, setShowModal] = useState(null);
	const [latestItem, setLatestItem] = useState(null);
	

	const handleRemoveItem = id => {
		setCartList(cartList.filter(item => item.id !== id));
	};

	const handleEditItem = (id, quantity) => {
		setCartList(
			cartList.map(item =>
				item.id === id
					? {
							...item,
							quantity,
					  }
					: item
			)
		);
	};

	const handleAddItem = product => {
		setCartList(
			cartList.find(item => item.id === product.id)
				? cartList.map(item =>
						item.id === product.id
							? {
									...item,
									quantity: item.quantity + product.quantity,
							  }
							: item
				  )
				: [...cartList, product]
		);

		setLatestItem(product);
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
					}}
				/>
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
