import "../../style/products/productNavBar.css";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const ProductsNavbar = ({ onSearchParams }) => {
	const [active, setActive] = useState(false);
	const [searchBarValue, setSearchBarValue] = useState("");

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleAddBorder = () => setActive(true);
	const handleRemoveBorder = () => setActive(false);
	const handleFilterTextChange = e => setSearchBarValue(e.target.value);
	const handleFilterProduct = e => {
		pathname !== "/shop" && navigate("/shop");
		const value = searchBarValue.trim();
		onSearchParams(value && `search=${value}`);
		e.preventDefault();
	};

	return (
		<div className="navigation">
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
				onSubmit={handleFilterProduct}
			>
				<div className="search-border">
					<input
						type="search"
						name="search"
						placeholder="search..."
						value={searchBarValue}
						onChange={handleFilterTextChange}
						onFocus={handleAddBorder}
						onBlur={handleRemoveBorder}
					/>
				</div>
				<button type="submit">
					<Icon path={mdiMagnify} />
				</button>
			</form>
		</div>
	);
};

ProductsNavbar.propTypes = {
	onSearchParams: PropTypes.func,
};

export default ProductsNavbar;
