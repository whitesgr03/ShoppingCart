import { useEffect, useState } from "react";

import { initialStorage } from "../firebase-config";

const storage = initialStorage();

const useFetchBgImage = page => {
	const [url, setUrl] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			try {
				const ref = storage.ref(`images/${page}/background.jpg`);
				const url = await ref.getDownloadURL();

				!ignore &&
					(url.includes(page)
						? setUrl(url)
						: (() => {
								throw new Error("server error");
						  })());
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		handleFetch();

		return () => {
			ignore = true;
		};
	}, [page]);
	return { url, error, loading };
};

export default useFetchBgImage;
