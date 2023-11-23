import "../style/notFound.css";
import Icon from "@mdi/react";
import { mdiHanger } from "@mdi/js";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="notFound">
			<div className="title">
				<Icon path={mdiHanger} size={7} />
				<h1>404 page not found</h1>
			</div>
			<div className="content">
				<p>Our apologies, there has been an error.</p>
				<p>The page you are looking for cannot be found.</p>
				<p>
					Please make sure the URL is correct or surf over to our
					other pages.
				</p>
				<p>
					You may visit the <Link to="/">Home</Link> page.
				</p>
				<p>
					If you have any questions, please{" "}
					<Link to="/contact"> Contact us</Link>.
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
