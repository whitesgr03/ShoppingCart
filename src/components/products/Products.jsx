import "../../style/products/products.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import ProductsNavbar from "./ProductsNavbar";
import Error from "../Error";

import useFetchProducts from "../../hook/useFetchProducts";

const Products = () => {
	const { products, error, loading } = useFetchProducts();

	const [filterText, setFilterText] = useState("");

	return (
		<div className="shop">
			<div className="navigation">
				<ProductsNavbar onFilterText={setFilterText} />
			</div>
			<>
				{loading && (
					<div data-testid="loading" className="loading">
						<Icon path={mdiLoading} spin={1} size={3} />
						Loading...
					</div>
				)}
				{error && <Error message={error} />}
				{!loading && !error && (
					<Outlet
						context={{
							products,
							filterText,
						}}
					/>
				)}
			</>
		</div>
	);
};

export default Products;
