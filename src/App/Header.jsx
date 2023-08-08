import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { initialAuth } from "../firebase-config";

import { useCart, useCartDispatch, useModalDispatch } from "./RootContext";

import {
	userLogout,
	googleLogin,
	checkUser,
	createUser,
} from "../utils/handleUserAccount";
import { getUserCart } from "../utils/handleUserCarts";

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
	const [isLogin, setIsLogin] = useState(false);
	const [auth, setAuth] = useState(true);
	const navigate = useNavigate();

	const modalDispatch = useModalDispatch();
	const cartDispatch = useCartDispatch();

	const handlePointerUp = () => {
		modalDispatch({
			type: "cart",
		});
	};

	useEffect(() => {
		const auth = initialAuth();

		const unsubscribe = auth.onAuthStateChanged(async user => {
			const hasUser = user && (await checkUser(user.uid));

			if (hasUser && !hasUser.success) {
				console.error(hasUser.message);
				return;
			}

			const createNewUser =
				user && !hasUser.data.userExists && (await createUser(user));

			if (createNewUser && !createNewUser.success) {
				console.error(hasUser.message);
				return;
			}

			const getCart = user && (await getUserCart());

			if (getCart && !getCart.success) {
				console.error(getCart.message);
				navigate("/error");
				return;
			}

			cartDispatch({
				type: "initialize_cart",
				cart: user && getCart.success ? getCart.data : [],
			});

			setIsLogin(user ? true : false);
			setAuth(false);
		});

		return () => unsubscribe();
	}, [cartDispatch, navigate]);

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

export { Header as default, HeaderBadge };
