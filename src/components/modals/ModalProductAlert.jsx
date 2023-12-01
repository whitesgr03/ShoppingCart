import "../../style/modals/modalProductAlert.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useState } from "react";

import { deleteUserCartItem } from "../../utils/handleUserCart";

import PropTypes from "prop-types";

const ModalProductAlert = ({
	userId,
	product,
	behavior,
	active,
	setAppError,
	onGetUserCart,
	onOpenModal,
}) => {
	const [removing, setRemoving] = useState(false);
	const handleShowCart = () => onOpenModal("cart");
	const handleRemoveItem = async () => {
		try {
			setLoading(true);
			await deleteUserCartItem(product.id, userId);
			await onGetUserCart(userId);
			handleShowCart();
		} catch (error) {
			console.error(error);
			setAppError("Service temporarily unavailable");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			data-testid="productAlert"
			className={`productAlert ${active ? "active" : ""}`}
		>
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
								Subtotal (without tax): {product.quantity}
								item(s) $
								{(product.quantity * product.price).toFixed(2)}
							</p>
						</div>
					</>
				)}
			</div>
			<div className="buttons">
				{behavior === "add" ? (
					<>
						<button className="left slide" onClick={handleShowCart}>
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
							onClick={handleRemoveItem}
						>
							REMOVE
						</button>
						<button
							className="right slide"
							onClick={handleShowCart}
						>
							CANCEL
						</button>
					</>
				)}
			</div>
			{loading && (
				<div className="loading">
					<Icon path={mdiLoading} spin={1} size={3}></Icon>
				</div>
			)}
		</div>
	);
};

ModalProductAlert.propTypes = {
	userId: PropTypes.string,
	product: PropTypes.object,
	behavior: PropTypes.string,
	active: PropTypes.bool,
	setAppError: PropTypes.func,
	onGetUserCart: PropTypes.func,
	onOpenModal: PropTypes.func,
};

export default ModalProductAlert;
