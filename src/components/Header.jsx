import PropTypes from "prop-types";

import Icon from "@mdi/react";
import { mdiCartVariant, mdiAccount, mdiTextBoxOutline } from "@mdi/js";

import { NavLink } from "react-router-dom";

const Header = ({ cartList, onToggleModal }) => {
	const handleOpenModal = e =>
		onToggleModal(e.target.closest(".button").name);

	const badge = (
		<span data-testid="quantity" className="quantity">
			{cartList && cartList.length}
		</span>
	);

	return (
		<div className="sidebar">
			<div className="icons">
				<button
					className="account button"
					type="button"
					name="showAccount"
				>
					<Icon path={mdiAccount} />
				</button>
				<button className="order button" type="button" name="showOrder">
					<Icon path={mdiTextBoxOutline} />
				</button>
				<button
					className="cart button"
					type="button"
					name="showCart"
					data-testid="cart"
					onPointerUp={handleOpenModal}
				>
					<Icon path={mdiCartVariant} />
					{cartList && cartList.length > 0 && badge}
				</button>
			</div>
			<h1 className="title">
				<NavLink to="/">GentSkin</NavLink>
			</h1>
			<ul className="pages">
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="shop">Shop</NavLink>
				</li>
				<li>
					<NavLink to="contact">Contact</NavLink>
				</li>
			</ul>
		</div>
	);
};

Header.propTypes = {
	cartList: PropTypes.array,
	onToggleModal: PropTypes.func,
};

export { Header as default };
