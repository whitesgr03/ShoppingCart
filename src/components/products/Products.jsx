import "../../style/products/products.css";

import { useState, useEffect, useContext, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import ProductsNavbar from "./ProductsNavbar";
import Error from "../Error";
import Loading from "../Loading";

import handleGetAllProducts from "../../utils/handleGetAllProducts";

import handlePreLoadImage from "../../utils/handlePreLoadImage";

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
				const productsResult = await handleGetAllProducts();

				!ignore &&
					(await Promise.all(
						productsResult.map(product =>
							handlePreLoadImage(product.url)
						)
					));

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
			{products && (
				<>
					<ProductsNavbar onSearchParams={setSearchParams} />
					<AppContext.Provider
						value={{
							userId,
							cart,
							onOpenModule,
							onGetUserCart,
							products,
							searchParams,
							onError: setError,
						}}
					>
						<Outlet />
					</AppContext.Provider>
				</>
			)}
		</div>
	);
};

export { Products as default };
