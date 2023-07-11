import {
	useCartDispatch,
	useModal,
	useModalDispatch,
} from "../../App/RootContext";

const ModalAlert = () => {
	const cartDispatch = useCartDispatch();
	const modalDispatch = useModalDispatch();

	const { alertProduct } = useModal();

	const { product, state } = alertProduct;

	const handleShowCart = () => {
		modalDispatch({
			type: "cart",
		});
	};

	const handleRemoveItem = () => {
		cartDispatch({
			type: "deleted",
			id: product.id,
		});
		handleShowCart();
	};

	return (
		<div className="alert">
			<div className="title" data-testid="title">
				{state === "add"
					? "Add product to cart"
					: "Remove product from cart"}
			</div>
			<button className="close"></button>
			<div className="product">
				{product && (
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
								Subtotal (without tax): {product.quantity}
								item(s) $
								{(product.quantity * product.price).toFixed(2)}
							</p>
						</div>
					</>
				)}
			</div>
			<div className="buttons">
				{state === "add" ? (
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
		</div>
	);
};

export default ModalAlert;
