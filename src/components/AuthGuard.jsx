import { useEffect, useState, useContext } from "react";

import Loading from "./Loading";

import { AppContext } from "./App";

import { handleGoogleLogin } from "../utils/handleUserAccount";

import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const { userId, onError } = useContext(AppContext);

	useEffect(() => {
		let ignore = false;
		try {
			!ignore && !userId && handleGoogleLogin();
			!ignore && userId && setLoading(false);
		} catch (error) {
			!ignore && onError(error);
		}
		return () => {
			ignore = true;
		};
	}, [userId, onError]);

	return <>{loading ? <Loading /> : children}</>;
};

AuthGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthGuard as default };
