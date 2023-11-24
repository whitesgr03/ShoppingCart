import "../../style/products/products.css";

import { useState, useEffect } from "react";
import { Outlet, useSearchParams, useOutletContext } from "react-router-dom";

import ProductsNavbar from "./ProductsNavbar";
import Error from "../Error";
import Loading from "../Loading";

import { initialFirestore } from "../../firebase-config";
import handlePreLoadImage from "../../utils/handlePreLoadImage";

const Products = () => {
	const [error, setError] = useState(null);
	const [products, setProducts] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const { userId, cart, onOpenModule, onGetUserCart } = useOutletContext();

	useEffect(() => {
		let ignore = false;
		const firestore = initialFirestore();
		const productRef = firestore.collection("products");

		const handleGetProducts = async () => {
			try {
				const result = await productRef.get();

				await Promise.all(
					result.docs.map(item => {
						const obj = { ...item.data() };
						return handlePreLoadImage(obj.url);
					})
				);

				const productsResult = result.docs.map(item => ({
					id: item.id,
					...item.data(),
				}));

				!ignore && setProducts(productsResult);
			} catch (error) {
				console.error(error);
				setError("Service temporarily unavailable");
			}
		};
		handleGetProducts();

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
