import { initialStorage } from "../firebase-config";

const getStorageImage = url => {
	const storage = initialStorage();
	return storage.ref(url).getDownloadURL();
};

export default getStorageImage;
