import "../../style/products/singleProductPage.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
	useCart,
	useCartDispatch,
	useModalDispatch,
} from "../../App/RootContext";

import { addUserCartItem } from "../../utils/handleUserCarts";

const SingleProductPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { state } = useLocation();
	const navigate = useNavigate();

	const cart = useCart();

	const cartDispatch = useCartDispatch();
	const modalDispatch = useModalDispatch();

	const maxOptions = 10;

	const options = Array.from({ length: maxOptions })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));

	const quantityToNumeric = data => {
		return [...data].map(([key, value]) =>
			key === "quantity" ? [key, Number(value)] : [key, value]
		);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (isLoading) return;

		setIsLoading(true);

		const formData = {
			...Object.fromEntries(
				quantityToNumeric(new FormData(e.target).entries())
			),
		};

		const hasProduct = cart.find(item => item.id === state.product.id);

		const product = {
			...state.product,
			...formData,
			quantity: hasProduct
				? hasProduct.quantity + formData.quantity
				: formData.quantity,
		};

		const result = await addUserCartItem(product);

		if (!result.success) {
			navigate("/error");
			return;
		}

		result.success && setIsLoading(false);

		cartDispatch({
			type: hasProduct ? "changed" : "added",
			product,
		});

		modalDispatch({
			type: "alert",
			item: {
				state: "add",
				product,
			},
		});
	};

	return state ? (
		<div className="productInfo">
			<div className="image">
				<img src={state.product.url} alt={state.product.name} />
			</div>
			<div className="info">
				<div className="description">
					<h2 className="title">{state.product.name}</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Magnam itaque nisi ipsa pariatur perspiciatis nemo.
					</p>
					<p className="price">${state.product.price.toFixed(2)}</p>
				</div>

				<form onSubmit={handleSubmit}>
					<label htmlFor="quantity">
						Quantity
						<select name="quantity" id="quantity" defaultValue={1}>
							{options}
						</select>
					</label>

					<button
						className={`slide ${isLoading ? "adding" : ""}`}
						type="submit"
					>
						{isLoading ? (
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
	) : (
		<div data-testid="productError" className="productError">
			<div className="error">
				<p>Our apologies, there has been an error.</p>
				<p>Please come back later or return to the previous page.</p>
			</div>
		</div>
	);
};

export default SingleProductPage;
