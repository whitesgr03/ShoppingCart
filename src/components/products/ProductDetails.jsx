import "../../style/products/productDetails.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Loading from "../Loading";

import { addUserCartItem } from "../../utils/handleUserCart";

import handlePreLoadImage from "../../utils/handlePreLoadImage";
import handleGetProduct from "../../utils/handleGetProduct";

import { AppContext } from "../App";

const OptionNum = 10;

const ProductDetails = () => {
	const [adding, setAdding] = useState(false);
	const [product, setProduct] = useState(null);

	const { userId, cart, onOpenModule, onGetUserCart, onProductsError } =
		useContext(AppContext);

	const { productId } = useParams();

	const options = Array.from({ length: OptionNum })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));

	const handleSubmit = e => {
		const addProduct = async () => {
			setAdding(true);

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
				await onGetUserCart(userId);
				onOpenModule("alert", newItem, "add");
			} catch (error) {
				onProductsError("Service temporarily unavailable");
			} finally {
				setAdding(false);
			}
		};

		!adding && addProduct();
		e.preventDefault();
	};

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const productsResult = await handleGetProduct(productId);

				!ignore &&
					productsResult &&
					(await handlePreLoadImage(productsResult.url));

				!ignore && setProduct(productsResult);
			} catch (error) {
				onProductsError("Service temporarily unavailable");
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, [productId, onProductsError]);

	return (
		<div className="productDetails">
			{!product && <Loading />}
			{product && (
				<>
					<div className="image">
						<img src={product.url} alt={product.name} />
					</div>
					<div className="info">
						<div className="description">
							<h2 className="title">{product.name}</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Magnam itaque nisi ipsa
								pariatur perspiciatis nemo.
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
									{options}
								</select>
							</label>

							<button
								className={`slide ${adding ? "adding" : ""}`}
								type="submit"
							>
								{adding ? (
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
				</>
			)}
		</div>
	);
};

export default ProductDetails;
