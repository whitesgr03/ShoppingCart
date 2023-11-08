import "../../style/products/productSearchBar.css";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { useState } from "react";

import PropTypes from "prop-types";

const ProductsSearchBar = ({ filterText, onFilterTextChange }) => {
	const [active, setActive] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		onFilterTextChange(...new FormData(e.target).values());
	};

	const handleChange = e => {
		onFilterTextChange(e.target.value);
	};

	const handleActiveSearchBarBorder = () => {
		setActive(true);
	};

	const handleDeActivateSearchBarBorder = () => {
		setActive(false);
	};
	return (
		<form
			data-testid="searchBar"
			className={`searchBar ${active ? "active-border" : ""}`}
			onFocus={handleActiveSearchBarBorder}
			onBlur={handleDeActivateSearchBarBorder}
			onSubmit={handleSubmit}
		>
			<div className="search-border">
				<input
					data-testid="search"
					type="search"
					name="search"
					placeholder="search..."
					value={filterText}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">
				<Icon path={mdiMagnify} />
			</button>
		</form>
	);
};

ProductsSearchBar.propTypes = {
	filterText: PropTypes.string,
	onFilterTextChange: PropTypes.func,
};

export default ProductsSearchBar;
