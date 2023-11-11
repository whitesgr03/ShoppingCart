import { useEffect, useState } from "react";
import { initialStorage } from "../firebase-config";

const FireBaseStorageResources = [
	"images/home/background.jpg",
	"images/contact/background.jpg",
];

const storage = initialStorage();

const useFetchBackgroundImage = () => {
	const [imageUrls, setImageUrls] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const result = await Promise.all(
					FireBaseStorageResources.map(url =>
						storage.ref(url).getDownloadURL()
					)
				);

				const urls =
					!ignore &&
					(await Promise.all(
						result.map(
							url =>
								new Promise(resolve => {
									const img = new Image();
									img.addEventListener(
										"load",
										() => resolve(url),
										{ once: true }
									);
									img.src = url;
								})
						)
					));

				!ignore && setImageUrls(urls);
			} catch (error) {
				!ignore && setError(error);
			} finally {
				!ignore && setLoading(false);
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, []);

	return { imageUrls, error, loading };
};

export default useFetchBackgroundImage;
