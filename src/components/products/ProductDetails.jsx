import "../../style/products/productDetails.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useEffect, useState, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";

import { addUserCartItem } from "../../utils/handleUserCart";

import { AppContext } from "../App";

const OptionNum = 10;

const ProductDetails = () => {
	const [product, setProduct] = useState(null);

	const { userId, cart, onOpenModule, onGetUserCart, onError } =
		useContext(AppContext);

	const { productId } = useParams();

	const product = useMemo(
		() => products.find(item => item.id === productId),
		[products, productId]
	);

	const handleSubmit = e => {
		const addProduct = async () => {
			setLoading(true);

			const quantityToNumeric = data =>
				[...data].map(([key, value]) =>
					key === "quantity" ? [key, Number(value)] : [key, value]
				);

			try {
				const formData = {
					...Object.fromEntries(
						quantityToNumeric(new FormData(e.target).entries())
					),
				};
				const productInCart = cart.find(item => item.id === productId);

				const newItem = {
					...product,
					quantity: productInCart
						? productInCart.quantity + formData.quantity
						: formData.quantity,
				};

				await addUserCartItem(newItem, userId);
				onOpenModule("alert", newItem, "add");
			} catch (error) {
				console.error(error);
				onError("Service temporarily unavailable");
			} finally {
				await onGetUserCart(userId);
				setLoading(false);
			}
		};

		!loading && addProduct();
		e.preventDefault();
	};

	useEffect(() => {
		!product && onError("Product not find");
	}, [product, onError]);

	return (
		product && (
			<div className="productDetails">
				<div className="image">
					<img src={product.url} alt={product.name} />
				</div>
				<div className="info">
					<div className="description">
						<h2 className="title">{product.name}</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Magnam itaque nisi ipsa pariatur perspiciatis
							nemo.
						</p>
						<p className="price">${product.price.toFixed(2)}</p>
					</div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="quantity">
							Quantity
							<select
								name="quantity"
								id="quantity"
								defaultValue={1}
							>
								{Array.from({ length: OptionNum })
									.fill([])
									.map((_, i) => (
										<option key={i} value={i + 1}>
											{i + 1}
										</option>
									))}
							</select>
						</label>

						<button
							className={`slide ${loading ? "adding" : ""}`}
							type="submit"
						>
							{loading ? (
								<>
									Adding
									<Icon path={mdiLoading} spin={1} />
								</>
							) : (
								<>Add to Cart</>
							)}
						</button>
					</form>
				</div>
			</div>
		)
	);
};

export default ProductDetails;
