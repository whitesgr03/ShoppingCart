import "../../style/modals/modalProductAlert.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useCartDispatch, useModal, useModalDispatch } from "../RootContext";

import PropTypes from "prop-types";

import { deleteUserCartItem } from "../../utils/handleUserCarts";

const ModalProductAlert = ({ isLoading, onLoading }) => {
	const [imageHeight, setImageHeight] = useState(0);
	const refDescription = useRef(0);

	const cartDispatch = useCartDispatch();
	const modalDispatch = useModalDispatch();

	const navigate = useNavigate();

	const { alertProduct } = useModal();

	const { product, state } = alertProduct;

	const getHeight = () => {
		imageHeight !== refDescription.current.scrollHeight &&
			setImageHeight(refDescription.current.scrollHeight);
	};

	const handleShowCart = () => {
		modalDispatch({
			type: "cart",
		});
	};

	const handleRemoveItem = async () => {
		if (isLoading) return;

		onLoading(true);
		const result = await deleteUserCartItem(product.id);

		if (!result.success) {
			onLoading(false);
			navigate("/error");
			return;
		}

		result.success &&
			cartDispatch({
				type: "deleted",
				id: product.id,
			});

		onLoading(false);
		handleShowCart();
	};

	useEffect(() => {
		product && setImageHeight(refDescription.current.scrollHeight);
	}, [product, refDescription]);

	return (
		<div className="productAlert">
			<div className="title" data-testid="title">
				{state === "add"
					? "Add product to cart"
					: "Remove product from cart"}
			</div>
			<button className="close"></button>
			<div className={"product"} onScroll={getHeight}>
				{product && (
					<>
						<div className="image" style={{ height: imageHeight }}>
							<img src={product.url} alt={product.name} />
						</div>
						<div className="description" ref={refDescription}>
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
			{isLoading && (
				<div className="loading">
					<Icon path={mdiLoading} spin={1} size={3}></Icon>
				</div>
			)}
		</div>
	);
};

ModalProductAlert.propTypes = {
	isLoading: PropTypes.bool,
	onLoading: PropTypes.func,
};

export default ModalProductAlert;
