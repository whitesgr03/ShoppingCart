import "../../style/products/products.css";

import { useState, useEffect, useContext } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import ProductsNavbar from "./ProductsNavbar";
import Error from "../Error";
import Loading from "../Loading";

import handleGetProducts from "../../utils/handleGetProducts";

import { AppContext } from "../App";

const Products = () => {
	const [error, setError] = useState(null);
	const [products, setProducts] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const { userId, cart, onOpenModule, onGetUserCart } =
		useContext(AppContext);

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const productsResult = await handleGetProducts();
				!ignore && setProducts(productsResult);
			} catch (error) {
				setError("Service temporarily unavailable");
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className="products">
			{!products && !error && <Loading />}
			{error && <Error message={error} />}
			{products && !error && (
				<>
					<ProductsNavbar onSearchParams={setSearchParams} />
					<Outlet
						context={{
							products,
							searchParams,
							userId,
							cart,
							onOpenModule,
							onGetUserCart,
							onError: setError,
						}}
					/>
				</>
			)}
		</div>
	);
};

export default Products;
