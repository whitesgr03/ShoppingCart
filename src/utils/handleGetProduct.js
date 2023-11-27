import { initialFirestore } from "../firebase-config";

const handleGetProduct = async productId => {
	const firestore = initialFirestore();
	const productRef = firestore.collection("products").doc(productId);

	const result = await productRef.get();

	const productResult = {
		id: result.id,
		...result.data(),
	};

	return productResult;
};

export default handleGetProduct;
