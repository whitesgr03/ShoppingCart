import { NavLink } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiCartVariant, mdiAccount, mdiTextBoxOutline } from "@mdi/js";

import { useCart, useModalDispatch } from "./RootContext";

const HeaderBadge = () => {
	const cartList = useCart();

	return (
		<>
			{cartList.length > 0 && (
				<span data-testid="badge" className="badge">
					{cartList.length}
				</span>
			)}
		</>
	);
};

const Header = () => {
	const dispatch = useModalDispatch();

	const handlePointerUp = () => {
		dispatch({
			type: "cart",
		});
	};

	return (
		<div className="sidebar" data-testid="sidebar">
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
					onPointerUp={handlePointerUp}
				>
					<Icon path={mdiCartVariant} />
					<HeaderBadge />
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

// Header.propTypes = {
// 	cartList: PropTypes.array,
// 	onToggleModal: PropTypes.func,
// };

export { Header as default, HeaderBadge };
