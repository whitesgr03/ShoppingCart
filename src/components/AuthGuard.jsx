import { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { initialAuth } from "../firebase-config";

import { googleLogin } from "../utils/handleUserAccount";

const AuthGuard = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	useLayoutEffect(() => {
		const auth = initialAuth();

		const unsubscribe = auth.onAuthStateChanged(async user => {
			!user && location.state && navigate(location.state.prevPath);
			!user && googleLogin();
		});

		return () => unsubscribe();
	}, [navigate, location]);

	return <>{children}</>;
};

export { AuthGuard as default };
