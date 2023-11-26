import { initialFirestore } from "../firebase-config";
import handlePreLoadImage from "./handlePreLoadImage";

const handleGetProducts = async () => {
	const firestore = initialFirestore();
	const productRef = firestore.collection("products");

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

	return productsResult;
};

export default handleGetProducts;
