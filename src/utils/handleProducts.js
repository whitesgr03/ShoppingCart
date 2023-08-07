import { initialFirestore } from "../firebase-config";

const getAllProducts = async () => {
	const firestore = initialFirestore();
	const productRef = firestore.collection("products");

	try {
		const products = await productRef.get();
		return {
			message: "Get products success.",
			success: true,
			data: products.empty
				? []
				: products.docs.map(item => ({
						id: item.id,
						...item.data(),
				  })),
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

export { getAllProducts as default };
