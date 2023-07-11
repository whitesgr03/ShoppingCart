import { useLocation } from "react-router-dom";

import { useCartDispatch, useModalDispatch } from "../../App/RootContext";

const SingleProductPage = () => {
	const { state } = useLocation();

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

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target).entries();

		const entriesNumeric = [...formData].map(([key, value]) =>
			key === "quantity" ? [key, Number(value)] : [key, value]
		);

		const newItem = {
			...state.product,
			productId: state.product.id,
			...Object.fromEntries(entriesNumeric),
		};

		cartDispatch({
			type: "added",
			item: newItem,
		});

		modalDispatch({
			type: "alert",
			item: {
				state: "add",
				product: newItem,
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

				<form   onSubmit={handleSubmit}>
					<label htmlFor="quantity">
						Quantity
						<select name="quantity" id="quantity" defaultValue={1}>
							{options}
						</select>
					</label>
					<button className="slide" type="submit">
						Add to Cart
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
