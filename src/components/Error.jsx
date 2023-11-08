import "../style/error.css";
import Icon from "@mdi/react";
import { mdiHanger } from "@mdi/js";

import { Link } from "react-router-dom";

const Error = () => {
	return (
		<div className="error">
			<Icon path={mdiHanger} size={7} />

			<div>
				<h1>Service temporarily unavailable.</h1>
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

export { Error as default };
