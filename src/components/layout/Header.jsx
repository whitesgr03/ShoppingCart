import "../../style/layout/header.css";

import Icon from "@mdi/react";
import {
	mdiCartVariant,
	mdiAccount,
	mdiTextBoxOutline,
	mdiLogout,
} from "@mdi/js";

import { NavLink } from "react-router-dom";
import {
	handleGoogleLogin,
	handleUserLogout,
} from "../../utils/handleUserAccount";

import PropTypes from "prop-types";

const Badge = ({ cart }) => {
	return (
		cart.length > 0 && (
			<span data-testid="badge" className="badge">
				{cart.length}
			</span>
		)
	);
};

const Header = ({ userId, setAppError, onOpenModal, children }) => {
	const handleLogin = async () => {
		try {
			await handleGoogleLogin();
		} catch (error) {
			setAppError("Service temporarily unavailable");
		}
	};

	const handleLogout = async () => {
		try {
			await handleUserLogout();
		} catch (error) {
			setAppError("Service temporarily unavailable");
		}
	};

	return (
		<div className="sidebar">
			<ul className={`icons ${userId === null ? "authenticate" : ""}`}>
				<li>
					<button
						className="account"
						type="button"
						name="showAccount"
						data-testid="accountButton"
						onClick={userId === "" ? handleLogin : handleLogout}
					>
						{userId === "" ? (
							<span data-testid="account">
								<Icon path={mdiAccount} />
							</span>
						) : (
							<span data-testid="logout">
								<Icon path={mdiLogout} />
							</span>
						)}
					</button>
				</li>
				<li>
					<button className="order" type="button" name="showOrder">
						<Icon path={mdiTextBoxOutline} />
					</button>
				</li>
				<li>
					<button
						className="cart"
						type="button"
						name="showCart"
						data-testid="cartButton"
						onClick={() => onOpenModal("cart")}
					>
						<Icon path={mdiCartVariant} />
						{children}
					</button>
				</li>
			</ul>
			<h1 className="title">
				<NavLink to="/">GentSkin</NavLink>
			</h1>
			<nav id="primaryNavigation" className="navigation">
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="shop">Shop</NavLink>
				</li>
				<li>
					<NavLink to="contact">Contact</NavLink>
				</li>
			</nav>
		</div>
	);
};

Header.propTypes = {
	userId: PropTypes.string,
	setAppError: PropTypes.func,
	onOpenModal: PropTypes.func,
	children: PropTypes.node.isRequired,
};

Badge.propTypes = {
	isLoading: PropTypes.array,
};

export { Header as default, Badge };
