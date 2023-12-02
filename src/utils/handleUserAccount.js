import { initialFirestore, initialAuth } from "../firebase-config";

const handleGoogleLogin = () => {
	const auth = initialAuth();
	const provider = new initialAuth.GoogleAuthProvider();
	auth.signInWithRedirect(provider);
};

const handleAuthState = cb => {
	const auth = initialAuth();
	const unsubscribe = auth.onAuthStateChanged(user => cb(user));

	return unsubscribe;
};

const handleUserLogout = async () => {
	const auth = initialAuth();
	await auth.signOut();
};

const handleCheckUser = async userId => {
	const firestore = initialFirestore();
	const userRef = firestore.collection("users").doc(userId);

	const user = await userRef.get();
	return user.exists;
};

const handleRegisterUser = async user => {
	const firestore = initialFirestore();

	const { displayName: name, uid, email } = user;
	const userInfo = {
		name,
		email,
	};

	const userRef = firestore.collection("users").doc(uid);

	await userRef.set(userInfo);
};

export {
	handleGoogleLogin,
	handleAuthState,
	handleUserLogout,
	handleCheckUser,
	handleRegisterUser,
};
