import { initialFirestore, initialAuth } from "../firebase-config";

const getUserCart = async () => {
	const firestore = initialFirestore();
	const auth = initialAuth();

	const userId = auth.currentUser.uid;

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart");

	try {
		const cartItems = await cartRef.get();
		return {
			message: "Get cart success.",
			success: true,
			data: cartItems.empty
				? []
				: cartItems.docs.map(item => ({ id: item.id, ...item.data() })),
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

const addUserCartItem = async item => {
	const firestore = initialFirestore();
	const auth = initialAuth();

	const userId = auth.currentUser.uid;
	const { id: productId, ...product } = item;

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart");

	const productRef = cartRef.doc(productId);

	try {
		await productRef.set(product);
		return {
			message: "Add to cart success.",
			success: true,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

const updateUserCartItem = async item => {
	const firestore = initialFirestore();
	const auth = initialAuth();

	const userId = auth.currentUser.uid;

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart")
		.doc(item.id);

	try {
		await cartRef.update(item);
		return {
			message: "Update cart item success.",
			success: true,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

const deleteUserCartItem = async productId => {
	const firestore = initialFirestore();
	const auth = initialAuth();

	const userId = auth.currentUser.uid;

	const cartRef = firestore
		.collection("carts")
		.doc(userId)
		.collection("cart")
		.doc(productId);

	try {
		await cartRef.delete();
		return {
			message: "Delete cart item success.",
			success: true,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

export { getUserCart, addUserCartItem, updateUserCartItem, deleteUserCartItem };
