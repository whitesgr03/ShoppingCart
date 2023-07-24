import { useState, useEffect } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";

import ProductsNavbar from "./ProductsNavbar";
import ProductsSearchBar from "./ProductsSearchBar";

const ShopPage = () => {
	const { pathname, key: currentKey } = useLocation();
	const { products } = useOutletContext();

	const isShopRoute = pathname === "/shop";

	const [filterText, setFilterText] = useState("");
	const [previousKey, setPreviousKey] = useState(currentKey);

	useEffect(() => {
		const isKeyChanged = previousKey !== currentKey;

		const handleClearFilterText = () => {
			setFilterText("");
			setPreviousKey(currentKey);
		};

		isShopRoute && isKeyChanged && handleClearFilterText();
	});

	return (
		<div className="shop">
			<div className="navigation">
				<ProductsNavbar />
				{isShopRoute && (
					<ProductsSearchBar
						filterText={filterText}
						onFilterTextChange={setFilterText}
					/>
				)}
			</div>
			<Outlet
				context={{
					products,
					filterText,
				}}
			/>
		</div>
	);
};

export default ShopPage;
