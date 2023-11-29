import "../style/home.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "./App";
import getStorageImage from "../utils/handleStorageImage";
import handlePreLoadImage from "../utils/handlePreLoadImage";

const Home = () => {
	const { imageUrls, setImageUrls, onAppError } = useContext(AppContext);
	const url = imageUrls["home"];

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			const imageResource = "images/home/background.jpg";
			try {
				const imageUrlsResult = await getStorageImage(imageResource);

				!ignore && (await handlePreLoadImage(imageUrlsResult));

				!ignore &&
					setImageUrls({
						...imageUrls,
						home: imageUrlsResult,
					});

				!ignore && console.log("active");
			} catch (error) {
				onAppError("Service temporarily unavailable");
			}
		};

		!url && handleFetch();

		return () => {
			ignore = true;
		};
	}, [url, imageUrls, setImageUrls, onAppError]);

	return (
		<div className="home">
			<div
				className="carousel"
				style={{
					backgroundImage: `url(${url})`,
				}}
			>
				<button type="button" className="arrow left"></button>
				<div className="content">
					<div className="container">
						<h2 className="title">Casual Summer Collection</h2>
						<Link className="link" to={`/shop`}>
							VIEW MORE
						</Link>
					</div>
				</div>
				<button type="button" className="arrow right"></button>
			</div>
		</div>
	);
};

export { Home as default };
