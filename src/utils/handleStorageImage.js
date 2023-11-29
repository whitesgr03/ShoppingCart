import { initialStorage } from "../firebase-config";

const handleGetStorageImage = url => {
	const storage = initialStorage();
	return storage.ref(url).getDownloadURL();
};

export default handleGetStorageImage;
