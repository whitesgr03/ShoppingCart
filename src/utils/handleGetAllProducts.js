import { initialFirestore } from "../firebase-config";

const handleGetAllProducts = async () => {
	const firestore = initialFirestore();
	const productsRef = firestore.collection("products");

	const result = await productsRef.get();

	const allProductsResult = result.empty
		? []
		: result.docs.map(item => ({
				id: item.id,
				...item.data(),
		  }));

	return allProductsResult;
};

export default handleGetAllProducts;
