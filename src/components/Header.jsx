import Icon from "@mdi/react";
import { mdiCartVariant, mdiAccount, mdiTextBoxOutline } from "@mdi/js";

import { NavLink } from "react-router-dom";

const Header = ({ cartList, onToggleModal }) => {
	const handleOpenModal = () => onToggleModal(true);
	return (
		<div className="sidebar">
			<div className="icons">
				<button type="button">
					<Icon path={mdiAccount} />
				</button>
				<button type="button">
					<Icon path={mdiTextBoxOutline} />
				</button>
				<button type="button">
					<Icon path={mdiCartVariant} />
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
