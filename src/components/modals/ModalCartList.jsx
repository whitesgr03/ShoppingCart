import "../../style/modals/modalCartList.css";
import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiLoading } from "@mdi/js";

import { useState, memo } from "react";

import { updateUserCartItem } from "../../utils/handleUserCart";

import PropTypes from "prop-types";

const Options = memo(quantity =>
	Array.from({
		length: quantity > 10 ? quantity : 10,
	})
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		))
);

const ModalCartList = memo(
	({ cart, userId, onError, onGetUserCart, onOpenModule }) => {
		const [loading, setLoading] = useState(false);

		const handleRemove = product =>
			onOpenModule("alert", product, "remove");

		const handleChange = async product => {
			try {
				setLoading(true);
				await updateUserCartItem(product, userId);
				await onGetUserCart(userId);
			} catch (error) {
				console.error(error);
				onError("Service temporarily unavailable");
			} finally {
				setLoading(false);
			}
		};

		return (
			<div className="items">
				<div className="itemWarp">
					{cart.map(product => (
						<div className="item" key={product.id}>
							<div className="warp">
								<img src={product.url} alt={product.name} />
							</div>
							<div className="description">
								<div className="info">
									<div className="name">{product.name}</div>
									<div className="price">
										${product.price.toFixed(2)}
									</div>
								</div>

								<div className="subtotal">
									<label htmlFor={product.name}>
										Quantity
										<select
											data-testid="quantity"
											name="quantity"
											id={product.name}
											onChange={e =>
												handleChange({
													...product,
													quantity: +e.target.value,
												})
											}
											value={product.quantity}
										>
										</select>
									</label>
									<p>
										Subtotal: $
										{(
											product.quantity * product.price
										).toFixed(2)}
									</p>
								</div>
							</div>
							<button
								className="removeBtn"
								data-testid="removeBtn"
								onClick={() => handleRemove(product)}
							>
								<Icon path={mdiTrashCanOutline} />
							</button>
						</div>
					))}
				</div>

				{loading && (
					<div className="loading">
						<Icon path={mdiLoading} spin={1} size={3}></Icon>
					</div>
				)}
			</div>
		);
	}
);
ModalCartList.propTypes = {
	cart: PropTypes.array,
	userId: PropTypes.string,
	onError: PropTypes.func,
	onGetUserCart: PropTypes.func,
	onOpenModule: PropTypes.func,
};

Options.propTypes = {
	quantity: PropTypes.number,
};

export default ModalCartList;
