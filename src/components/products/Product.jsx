import "../../style/products/product.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { useCart, useCartDispatch, useModalDispatch } from "../RootContext";

import { addUserCartItem } from "../../utils/handleUserCarts";

const NUM = 10;

const Product = () => {
	const [loading, setLoading] = useState(false);

	const { products } = useOutletContext();
	const { productId } = useParams();

	const product = products.find(item => item.id === productId);

	const navigate = useNavigate();

	const cart = useCart();

	const cartDispatch = useCartDispatch();
	const modalDispatch = useModalDispatch();

	const options = Array.from({ length: NUM })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));

	const quantityToNumeric = data =>
		[...data].map(([key, value]) =>
			key === "quantity" ? [key, Number(value)] : [key, value]
		);

	const handleSubmit = e => {
		e.preventDefault();

		const addProduct = async () => {
			setLoading(true);

			const formData = {
				...Object.fromEntries(
					quantityToNumeric(new FormData(e.target).entries())
				),
			};

			const hasProduct = cart.find(item => item.id === product.id);

			const data = {
				...product,
				...formData,
				quantity: hasProduct
					? hasProduct.quantity + formData.quantity
					: formData.quantity,
			};

			const result = await addUserCartItem(data);

			if (!result.success) {
				navigate("/error");
				return;
			}

			result.success && setLoading(false);

			cartDispatch({
				type: hasProduct ? "changed" : "added",
				product: data,
			});

			modalDispatch({
				type: "alert",
				item: {
					state: "add",
					product: data,
				},
			});
		};

		!loading && addProduct();
	};

	return product ? (
		<div className="productInfo">
			<div className="image">
				<img src={product.url} alt={product.name} />
			</div>
			<div className="info">
				<div className="description">
					<h2 className="title">{product.name}</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Magnam itaque nisi ipsa pariatur perspiciatis nemo.
					</p>
					<p className="price">${product.price.toFixed(2)}</p>
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="quantity">
						Quantity
						<select name="quantity" id="quantity" defaultValue={1}>
							{options}
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
	) : (
		<div data-testid="productError" className="productError">
			<div className="error">
				<p>Our apologies, there has been an error.</p>
				<p>Please come back later or return to the previous page.</p>
			</div>
		</div>
	);
};

export default Product;
