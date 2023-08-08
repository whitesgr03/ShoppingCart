import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiLoading } from "@mdi/js";

import PropTypes from "prop-types";

import { useCartDispatch, useModalDispatch } from "../../App/RootContext";

import { updateUserCartItem } from "../../utils/handleUserCarts";

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

	const navigate = useNavigate();

	const handleRemove = product => {
		modalDispatch({
			type: "alert",
			item: {
				state: "remove",
				product,
			},
		});
	};

	const handleChange = async product => {
		onLoading(true);

		const result = await updateUserCartItem(product);

		if (!result.success) {
			onLoading(false);
			navigate("/error");
			return;
		}

		result.success &&
			cartDispatch({
				type: "changed",
				product,
			});

		onLoading(false);
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

			{isLoading && (
				<div className="loading">
					<Icon path={mdiLoading} spin={1} size={3}></Icon>
				</div>
			)}
	);
};

ModalCartList.propTypes = {
	list: PropTypes.array,
	isLoading: PropTypes.bool,
	onLoading: PropTypes.func,
};

ModalCartListOption.propTypes = {
	quantity: PropTypes.number,
};

export default ModalCartList;
