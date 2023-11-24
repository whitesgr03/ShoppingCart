import "../../style/modals/modalCart.css";

import { useMemo } from "react";

import PropTypes from "prop-types";

const ModalCart = ({ cart, active, onOpenModule, children }) => {
	const handleCheckout = () => onOpenModule(null);

	const totalPrice = useMemo(() => {
		return cart
			.reduce((sum, product) => sum + product.price * product.quantity, 0)
			.toFixed(2);
	}, [cart]);

	return (
		<div className={`cart ${active ? "active" : ""}`}>
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
	isLoading: PropTypes.bool,
	onLoading: PropTypes.func,
};

export default ModalCart;
