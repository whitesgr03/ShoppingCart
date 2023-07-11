import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { fetchResource } from "../../utils/utils";

import ProductsNavbar from "./ProductsNavbar";
import ProductsSearchBar from "./ProductsSearchBar";

const ShopPage = () => {
	const { pathname, key: currentKey } = useLocation();

	const isShopRoute = pathname === "/shop";

	const [products, setProducts] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [previousKey, setPreviousKey] = useState(currentKey);

	useEffect(() => {
		const handleFetch = async () => {
			setProducts(await fetchResource());
		};
		handleFetch();
	}, []);

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
			{products.length === 0 ? (
				<div data-testid="loading" className="loading">
					<Icon path={mdiLoading} spin={1} size={3} />
					{"Loading..."}
				</div>
			) : (
				<Outlet
					context={{
						products,
						filterText,
					}}
				/>
			)}
		</div>
	);
};

export default ShopPage;
