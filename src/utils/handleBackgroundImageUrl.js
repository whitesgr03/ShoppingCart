import { initialStorage } from "../firebase-config";

const getBackgroundImageUrl = async page => {
	const storage = initialStorage();
	const ref = storage.ref(`images/${page}/background.jpg`);

	try {
		const url = await ref.getDownloadURL();

		return {
			message: "Get background-image url success.",
			success: true,
			data: url,
		};
	} catch (error) {
		return {
			message: error,
			success: false,
		};
	}
};

export { getBackgroundImageUrl as default };
