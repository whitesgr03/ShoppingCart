import { initialFirestore } from "../firebase-config";

const firestore = initialFirestore();

const fetchProducts = async () => {
	const productRef = firestore.collection("products");
	const result = await productRef.get();

	return result.empty
		? (() => {
				throw result;
		  })()
		: result.docs.map(item => {
				const { name, price, url } = item.data();
				return {
					id: item.id,
					name,
					url,
					price,
				};
		  });
};

export { fetchProducts as default };
