import "../style/error.css";
import Icon from "@mdi/react";
import { mdiHanger } from "@mdi/js";

import PropTypes from "prop-types";

const Error = ({ message }) => {
	return (
		<div className="error">
			<div className="title">
				<Icon path={mdiHanger} size={7} />
				<h1>{message}</h1>
			</div>
			<div className="content">
				<p>Our apologies, there has been an error.</p>
				<p>
					Please come back later or you may surf over to our other
					pages.
				</p>
			</div>
		</div>
	);
};

Error.propTypes = {
	message: PropTypes.string,
};

export default Error;
