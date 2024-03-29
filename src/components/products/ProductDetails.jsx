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

	const { userId, cart, onOpenModal, onGetUserCart, setProductsError } =
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

			try {
				const formData = {
					...Object.fromEntries(new FormData(e.target).entries()),
				};

				const productInCart = cart.find(item => item.id === productId);

				const newItem = {
					...product,
					quantity: productInCart
						? productInCart.quantity + +formData.quantity
						: +formData.quantity,
				};

				await addUserCartItem(newItem, userId);
				await onGetUserCart(userId);
				onOpenModal("alert", newItem, "add");
			} catch (error) {
				setProductsError("Service temporarily unavailable");
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
				const productResult = await handleGetProduct(productId);

				!productResult && setProductsError("No matches found");

				!ignore &&
					productResult &&
					(await handlePreLoadImage(productResult.url));

				!ignore && productResult && setProduct(productResult);
			} catch (error) {
				setProductsError("Service temporarily unavailable");
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, [productId, setProductsError]);

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
