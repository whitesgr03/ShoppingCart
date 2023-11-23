import { initialFirestore, initialAuth } from "../firebase-config";

const handleGoogleLogin = () => {
	const auth = initialAuth();
	const provider = new initialAuth.GoogleAuthProvider();
	auth.signInWithRedirect(provider);
};

const handleLogout = async () => {
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
	const { displayName: name, uid, email } = user;

	const userInfo = {
		name,
		email,
	};

	const firestore = initialFirestore();
	const userRef = firestore.collection("users").doc(uid);

	await userRef.set(userInfo);
};

export { handleGoogleLogin, handleLogout, handleCheckUser, handleRegisterUser };
