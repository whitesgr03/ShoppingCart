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
	({ cart, userId, setAppError, onGetUserCart, onOpenModal }) => {
		const [changing, setChanging] = useState(false);

		const handleRemove = product =>
			onOpenModule("alert", product, "remove");

		const handleChange = async product => {
			setChanging(true);
			try {
				await updateUserCartItem(product, userId);
				await onGetUserCart(userId);
			} catch (error) {
				console.error(error);
				setAppError("Service temporarily unavailable");
			}
			setChanging(false);
		};

		return (
			<ul className="list">
				<div className="listWarp">
					{cart.map(product => (
						<li className="item" key={product.id}>
							<div className="imageWarp">
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
											<Options
												quantity={product.quantity}
											/>
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
									onOpenModal("alert", product, "remove")
							>
								<Icon path={mdiTrashCanOutline} />
							</button>
						</li>
					))}
				</div>

				{changing && (
					<div className="loading">
						<Icon path={mdiLoading} spin={1} size={3}></Icon>
					</div>
				)}
			</ul>
		);
	}
);
ModalCartList.propTypes = {
	cart: PropTypes.array,
	userId: PropTypes.string,
	setAppError: PropTypes.func,
	onGetUserCart: PropTypes.func,
	onOpenModal: PropTypes.func,
};

Options.propTypes = {
	quantity: PropTypes.number,
};

export default ModalCartList;
