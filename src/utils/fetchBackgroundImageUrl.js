import { initialStorage } from "../firebase-config";

const storage = initialStorage();

const fetchBackgroundImageUrl = async page => {
	const ref = storage.ref(`images/${page}/background.jpg`);
	return await ref.getDownloadURL();
};

export { fetchBackgroundImageUrl as default };
