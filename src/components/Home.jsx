import "../style/home.css";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
	const { homeUrl: url } = useOutletContext();

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
