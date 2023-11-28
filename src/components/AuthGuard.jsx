import { useEffect, useContext } from "react";

import Loading from "./Loading";

import { AppContext } from "./App";

import { handleGoogleLogin } from "../utils/handleUserAccount";

import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
	const { userId, onError } = useContext(AppContext);

	useEffect(() => {
		try {
			!userId && handleGoogleLogin();
		} catch (error) {
			onError(error);
		}
	}, [userId, onError]);

	return <>{userId ? children : <Loading />}</>;
};

AuthGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthGuard as default };
