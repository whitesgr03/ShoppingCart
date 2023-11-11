import { useEffect, useState } from "react";

import { initialFirestore } from "../firebase-config";

const firestore = initialFirestore();
const productRef = firestore.collection("products");

const useFetchAllBgImages = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const result = await productRef.get();

				const data =
					!ignore &&
					(await Promise.all(
						result.docs.map(item => {
							const obj = { ...item.data() };
							return new Promise(resolve => {
								const img = new Image();
								img.addEventListener(
									"load",
									() => {
										resolve({
											id: item.id,
											...obj,
										});
									},
									{ once: true }
								);
								img.src = obj.url;
							});
						})
					));

				!ignore && setProducts(data);
			} catch (error) {
				!ignore && setError(error);
			} finally {
				!ignore && setLoading(false);
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, []);

	return { products, error, loading };
};

export default useFetchAllBgImages;
