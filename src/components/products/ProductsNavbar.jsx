import "../../style/products/productNavBar.css";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const ProductsNavbar = ({ onFilterText }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [active, setActive] = useState(false);
	const [searchBarValue, setSearchBarValue] = useState("");

	const handleFilterTextChange = e => {
		setSearchBarValue(e.target.value);
	};

	const handleFilterProduct = e => {
		e.preventDefault();
		onFilterText(searchBarValue);
		pathname !== "/shop" && navigate("/shop");
	};

	const handleActiveSearchBarBorder = () => {
		setActive(true);
	};

	const handleDeActivateSearchBarBorder = () => {
		setActive(false);
	};

	return (
		<>
			<ul className="category">
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li> / </li>
				<li>
					<Link to="/shop">Category</Link>
				</li>
			</ul>
			<form
				data-testid="searchBar"
				className={`searchBar ${active ? "active-border" : ""}`}
				onFocus={handleActiveSearchBarBorder}
				onBlur={handleDeActivateSearchBarBorder}
				onSubmit={handleFilterProduct}
			>
				<div className="search-border">
					<input
						data-testid="search"
						type="search"
						name="search"
						placeholder="search..."
						value={searchBarValue}
						onChange={handleFilterTextChange}
					/>
				</div>
				<button type="submit">
					<Icon path={mdiMagnify} />
				</button>
			</form>
		</>
	);
};

ProductsNavbar.propTypes = {
	onFilterText: PropTypes.func,
};

export default ProductsNavbar;
