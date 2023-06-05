import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
	const navigate = useNavigate();
	const error = useRouteError();
	console.error(error);

	useEffect(() => {
		setTimeout(() => navigate("/"), 1000);
	}, [navigate]);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
