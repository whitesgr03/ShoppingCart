import "../style/home.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import { AppContext } from "./App";
import handleGetStorageImage from "../utils/handleStorageImage";
import handlePreLoadImage from "../utils/handlePreLoadImage";

const Home = () => {
	const { imageUrls, setImageUrls, setAppError } = useContext(AppContext);
	const url = imageUrls["home"];

	useEffect(() => {
		let ignore = false;

		const handleFetch = async () => {
			const imageResource = "images/home/background.jpg";
			try {
				const imageUrlsResult = await handleGetStorageImage(
					imageResource
				);

				!ignore && (await handlePreLoadImage(imageUrlsResult));

				!ignore &&
					setImageUrls({
						...imageUrls,
						home: imageUrlsResult,
					});
			} catch (error) {
				setAppError("Service temporarily unavailable");
			}
		};

		!url && handleFetch();

		return () => {
			ignore = true;
		};
	}, [url, imageUrls, setImageUrls, setAppError]);

	return (
		<div className="home">
			{!url && <Loading />}
			{url && (
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
			)}
		</div>
	);
};

export { Home as default };
