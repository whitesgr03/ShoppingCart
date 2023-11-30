import { useEffect, useContext } from "react";

import Loading from "./Loading";

import { AppContext } from "./App";

import { handleGoogleLogin } from "../utils/handleUserAccount";

import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
	const { userId, setProductError } = useContext(AppContext);

	useEffect(() => {
		try {
			!userId && handleGoogleLogin();
		} catch (error) {
			setProductError(error);
		}
	}, [userId, setProductError]);

	return <>{userId ? children : <Loading />}</>;
};

AuthGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthGuard as default };
