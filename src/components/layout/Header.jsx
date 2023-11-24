import "../../style/layout/header.css";
import Icon from "@mdi/react";
import {
	mdiCartVariant,
	mdiAccount,
	mdiTextBoxOutline,
	mdiLogout,
} from "@mdi/js";

import { NavLink } from "react-router-dom";
import { handleGoogleLogin, handleLogout } from "../../utils/handleUserAccount";

const Header = ({ cart, userId, onOpenModal }) => {
	return (
		<div className="sidebar" data-testid="sidebar">
			<div className={`icons ${userId === null ? "authenticate" : ""}`}>
				<button
					className="account"
					type="button"
					name="showAccount"
					onClick={userId === "" ? handleGoogleLogin : handleLogout}
				>
					<Icon path={userId === "" ? mdiAccount : mdiLogout} />
				</button>
				<button className="order" type="button" name="showOrder">
					<Icon path={mdiTextBoxOutline} />
				</button>
				<button
					className="cart"
					type="button"
					name="showCart"
					data-testid="cart"
					onClick={() => onOpenModal("cart")}
				>
					<Icon path={mdiCartVariant} />
					{cart.length > 0 && (
						<span data-testid="badge" className="badge">
							{cart.length}
						</span>
					)}
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

export { Header as default };
