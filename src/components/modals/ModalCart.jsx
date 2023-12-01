import "../../style/modals/modalCart.css";

import { useMemo } from "react";

import PropTypes from "prop-types";

const ModalCart = ({ cart, active, onOpenModal, children }) => {
	const handleCheckout = () => onOpenModal(null);

	const totalPrice = useMemo(
		() =>
			cart
				.reduce(
					(sum, product) => sum + product.price * product.quantity,
					0
				)
				.toFixed(2),
		[cart]
	);

	return (
		<div data-tesxtid="cart" className={`cart ${active ? "active" : ""}`}>
			<button className="close"></button>
			<div className="title">Shopping cart</div>

			{cart.length === 0 ? (
				<div data-testid="empty" className="empty">
					Your cart is currently empty.
				</div>
			) : (
				<>
					{children}
					<div className="checkout">
						<p className="price">
							Total: <b>${totalPrice}</b>
						</p>

						<button
							className="checkoutBtn slide"
							onClick={handleCheckout}
						>
							CHECKOUT
						</button>
					</div>
				</>
			)}
		</div>
	);
};

ModalCart.propTypes = {
	cart: PropTypes.array,
	active: PropTypes.bool,
	onOpenModal: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default ModalCart;
