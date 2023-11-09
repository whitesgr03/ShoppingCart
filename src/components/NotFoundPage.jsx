import "../style/notFoundPage.css";
import Icon from "@mdi/react";
import { mdiHanger } from "@mdi/js";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="notFound">
			<Icon path={mdiHanger} size={7} />

			<div>
				<h1>404 page not found</h1>
				<p>
					Our apologies, there has been an error. Please come back
					later or return to the <Link to="/">Home</Link> page. If you
					have any questions, please visit the{" "}
					<Link to="/contact">Contact us</Link>.
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
