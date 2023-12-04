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
