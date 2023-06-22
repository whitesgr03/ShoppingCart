import { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

const Modal = ({
	cartList,
	showModal,
	latestItem,
	onToggleModal,
	onEditItem,
	onRemoveItem,
	onSetLatestItem,
}) => {
	const [deleteItem, setDeleteItem] = useState(null);

	const handleCheckTarget = e =>
		(e.target.classList.contains("shadow") ||
			e.target.classList.contains("close")) &&
		handleCloseModal();

	const handleCloseModal = () => {
		onToggleModal(null);
		setDeleteItem(null);
		onSetLatestItem(null);
	};

	return (
		<div
			data-testid="shadow"
			className={`shadow ${showModal ? `${showModal} active` : ""}`}
			onPointerUp={handleCheckTarget}
		>
			{cartList && (
				<Cart
					cartList={cartList}
					onEditItem={onEditItem}
					onToggleModal={onToggleModal}
					onSetDeleteItem={setDeleteItem}
				/>
			)}
		</div>
	);
};

const Cart = ({ cartList, onEditItem }) => {

	const totalPrice = cartList
		.reduce((sum, product) => sum + product.price * product.quantity, 0)
		.toFixed(2);

	const createOptions = maxQuantity => {
		const quantity = maxQuantity > 10 ? maxQuantity : 10;

		return Array.from({ length: quantity })
			.fill([])
			.map((_, i) => (
				<option key={i} value={i + 1}>
					{i + 1}
				</option>
			));
	};

	const list = cartList.map(product => (
		<div className="item" key={product.id}>
			<div className="warp">
				<img src={product.url} alt={product.name} />
			</div>
			<div className="description">
				<div className="info">
					<div className="name">{product.name}</div>
					<div className="price">${product.price}</div>
				</div>

				<label htmlFor={product.name}>
					Quantity
					<select
						data-testid="quantity"
						name="quantity"
						id={product.name}
						onChange={e => handleChange(e, product)}
						defaultValue={product.quantity}
					>
						{options}
					</select>
				</label>
			</div>
		</div>
	));

	return (
		<div className="cart">
			<button className="close"></button>
			<div className="title">Shopping cart</div>

			{cartList && cartList.length > 0 ? (
				<>
					<div className="items">{list}</div>
					<div className="checkout">
						<p className="price">
							Total: <b>${totalPrice}</b>
						</p>

						<Link
							className="slide"
							onClick={e => e.preventDefault()}
						>
							CHECKOUT
						</Link>
					</div>
				</>
			) : (
				<div data-testid="empty" className="empty">
					Your cart is currently empty.
				</div>
			)}
		</div>
	);
};

export { Modal as default, Cart };
