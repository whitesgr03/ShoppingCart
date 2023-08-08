import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

import PropTypes from "prop-types";

import { useCartDispatch, useModalDispatch } from "../../App/RootContext";

const ModalCartListOption = ({ quantity }) => {
	const maxQuantity = quantity > 10 ? quantity : 10;

	return Array.from({ length: maxQuantity })
		.fill([])
		.map((_, i) => (
			<option key={i} value={i + 1}>
				{i + 1}
			</option>
		));
};

const ModalCartList = ({ list, isLoading, onLoading }) => {
	const cartDispatch = useCartDispatch();
	const modalDispatch = useModalDispatch();

	const handleRemove = product => {
		modalDispatch({
			type: "alert",
			item: {
				state: "remove",
				product,
			},
		});
	};

	const handleChange = item => {
		cartDispatch({
			type: "changed",
			item,
		});
	};

	return (
		<div className="items">
			{list.map(product => (
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
									<ModalCartListOption
										quantity={product.quantity}
									/>
								</select>
							</label>
							<p>
								Subtotal: $
								{(product.quantity * product.price).toFixed(2)}
							</p>
						</div>
					</div>
					<button
						className="removeBtn"
						data-testid="removeBtn"
						onPointerUp={() => handleRemove(product)}
					>
						<Icon path={mdiTrashCanOutline} />
					</button>
				</div>
			))}
		</div>
	);
};

ModalCartList.propTypes = {
	list: PropTypes.array,
};

ModalCartListOption.propTypes = {
	quantity: PropTypes.number,
};

export default ModalCartList;
