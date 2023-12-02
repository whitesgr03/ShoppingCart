import { initialFirestore } from "../firebase-config";

const getUserCart = async userId => {
	const firestore = initialFirestore();
	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart");

	const result = await cartRef.get();

	const cartResult = result.empty
		? []
		: result.docs.map(item => ({
				id: item.id,
				...item.data(),
		  }));

	return cartResult;
};

const addUserCartItem = async (item, userId) => {
	const firestore = initialFirestore();

	const { id: productId, ...product } = item;

	const productRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart")
		.doc(productId);

	await productRef.set(product);
};

const updateUserCartItem = async (item, userId) => {
	const firestore = initialFirestore();

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart")
		.doc(item.id);

	await cartRef.update(item);
};

const deleteUserCartItem = async (productId, userId) => {
	const firestore = initialFirestore();

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart")
		.doc(productId);

	await cartRef.delete();
};

export { getUserCart, addUserCartItem, updateUserCartItem, deleteUserCartItem };
