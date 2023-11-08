import "../style/App/home.css";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
	const { backgroundImage } = useOutletContext();

	return (
		<div className="home">
			<div
				className="carousel"
				style={{
					backgroundImage: backgroundImage.home,
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
			<div className="info"></div>
			<div className="category"></div>
		</div>
	);
};

export { Home as default };
