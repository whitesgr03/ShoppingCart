import { useNavigate } from "react-router-dom";

import { useCart } from "../../App/RootContext";
import { useModalDispatch } from "../../App/RootContext";

import ModalCartList from "./ModalCartList";

const ModalCart = () => {
	const navigate = useNavigate();
	const cartList = useCart();

	const modalDispatch = useModalDispatch();

	const handleCheckout = () => {
		modalDispatch({
			type: "close",
		});
		navigate("/");
	};

	const totalPrice = cartList
		.reduce((sum, product) => sum + product.price * product.quantity, 0)
		.toFixed(2);

	return (
		<div className="cart">
			<button className="close"></button>
			<div className="title">Shopping cart</div>

			{cartList.length === 0 ? (
				<div data-testid="empty" className="empty">
					Your cart is currently empty.
				</div>
			) : (
				<>
					<ModalCartList list={cartList} />
					<div className="checkout">
						<p className="price">
							Total: <b>${totalPrice}</b>
						</p>

						<button
							className="checkoutBtn slide"
							onPointerUp={handleCheckout}
						>
							CHECKOUT
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ModalCart;
