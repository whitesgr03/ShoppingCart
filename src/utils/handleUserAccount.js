import { initialFirestore, initialAuth } from "../firebase-config";

const handleGoogleLogin = () => {
	const auth = initialAuth();
	const provider = new initialAuth.GoogleAuthProvider();
	auth.signInWithRedirect(provider);
};

const handleLogout = async () => {
	const auth = initialAuth();
	try {
		await auth.signOut();
		return {
			message: "User logout success.",
			success: true,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

const handleCheckUser = async userId => {
	const firestore = initialFirestore();
	const userRef = firestore.collection("users").doc(userId);

	try {
		const user = await userRef.get();
		return {
			message: "Check user success.",
			success: true,
			data: {
				userExists: user.exists,
			},
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

const createUser = async user => {
	const { displayName: name, uid, email } = user;

	const userInfo = {
		name,
		email,
	};

	const firestore = initialFirestore();

	const userRef = firestore.collection("users").doc(uid);

	try {
		await userRef.set(userInfo);
		return {
			message: "Create user success.",
			success: true,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

export { userLogout, googleLogin, checkUser, createUser };
