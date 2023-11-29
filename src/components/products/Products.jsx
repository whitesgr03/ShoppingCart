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
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		userId,
		cart,
		products,
		setProducts,
		onAppError,
		onOpenModule,
		onGetUserCart,
	} = useContext(AppContext);

	const filterText = useMemo(
		() => searchParams.get("search"),
		[searchParams]
	);

	const filterProducts = useMemo(
		() =>
			filterText
				? products.filter(
						item =>
							item.name
								.toLowerCase()
								.indexOf(filterText.toLowerCase().trim()) !== -1
				  )
				: products,
		[filterText, products]
	);

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const productsResult = await handleGetAllProducts();

				!ignore &&
					productsResult &&
					(await Promise.all(
						productsResult.map(product =>
							handlePreLoadImage(product.url)
						)
					));

				!ignore && setProducts(productsResult);
			} catch (error) {
				onAppError("Service temporarily unavailable");
			}
		};
		products.length === 0 && handleFetch();

		return () => {
			ignore = true;
		};
	}, [products, setProducts, onAppError]);

	return (
		<div className="products">
			{products.length === 0 && !error && <Loading />}
			{error && <Error message={error} />}
			{products.length > 0 && (
				<>
					<ProductsNavbar onSearchParams={setSearchParams} />
					<AppContext.Provider
						value={{
							userId,
							cart,
							onOpenModule,
							onGetUserCart,
							filterProducts,
							onProductsError: setError,
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
