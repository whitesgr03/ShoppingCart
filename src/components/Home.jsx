import "../style/home.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "./App";

const Home = () => {
	const { imageUrls, setImageUrls, onAppError } = useContext(AppContext);

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
