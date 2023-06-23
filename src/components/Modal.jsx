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

const Cart = ({ cartList, onEditItem, onToggleModal, onSetDeleteItem }) => {
	const handleRemove = product => {
		onToggleModal("showAlert");
		onSetDeleteItem(product);
	};

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
					<div className="price">${product.price.toFixed(2)}</div>
				</div>

				<div className="subtotal">
					<label htmlFor={product.name}>
						Quantity
						<select
							data-testid="quantity"
							name="quantity"
							id={product.name}
							onChange={e => {
								onEditItem(product.id, +e.target.value);
							}}
							value={product.quantity}
						>
							{createOptions(product.quantity)}
						</select>
					</label>
					<p>
						Subtotal: $
						{(product.quantity * product.price).toFixed(2)}
					</p>
				</div>
			</div>
			<button
				className="removeBtn"
				data-testid="removeBtn"
				onPointerUp={() => handleRemove(product)}
			>
				<Icon path={mdiTrashCanOutline} />
			</button>
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

						<Link className="checkoutBtn slide" to={"/checkout"}>
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

const Alert = ({
	newItem,
	deleteItem,
	onToggleModal,
	onSetLatestItem,
	onRemoveItem,
	onSetDeleteItem,
}) => {
	const product = (newItem || deleteItem) ?? false;

	const handleShowCart = () => {
		onToggleModal("showCart");
		removeAlertProduct();
	};

	const handleRemoveItem = () => {
		onRemoveItem(product.id);
		handleShowCart();
	};

	const removeAlertProduct = () => {
		onSetLatestItem(null);
		onSetDeleteItem(null);
	};

	return (
		<div className="alert">
			{product && (
				<>
					<div className="title" data-testid="title">
						{newItem
							? "Add product to cart"
							: "Remove product from cart"}
					</div>
					<button className="close"></button>
					<div className="product">
						{
							<>
								<div className="image">
									<img src={product.url} alt={product.name} />
								</div>
								<div className="description">
									<h2 className="title">{product.name}</h2>
									<p className="quantity">
										Quantity: {product.quantity}
									</p>
									<p className="price">
										Price: ${product.price.toFixed(2)}
									</p>
									<p className="subtotal">
										Subtotal (without tax):{" "}
										{product.quantity}
										item(s) $
										{(
											product.quantity * product.price
										).toFixed(2)}
									</p>
								</div>
							</>
						}
					</div>
					<div className="buttons">
						{newItem ? (
							<>
								<button
									className="left slide"
									onPointerUp={handleShowCart}
								>
									VIEW CART
								</button>
								<button className="right slide close">
									CONTINUE SHOPPING
								</button>
							</>
						) : (
							<>
								<button
									className="left slide"
									onPointerUp={handleRemoveItem}
								>
									REMOVE
								</button>
								<button
									className="right slide"
									onPointerUp={handleShowCart}
								>
									CANCEL
								</button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export { Modal as default, Cart, Alert };
