import "../style/app.css";

import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Modal from "./modals/Modal";
import Error from "./Error";


import Loading from "./Loading";


import { initialAuth } from "../firebase-config";

import preLoadImage from "../utils/handlePreLoadImage";
import getStorageImage from "../utils/handleStorageImage";
import { getUserCart } from "../utils/handleUserCart";

import {
	handleCheckUser,
	handleRegisterUser,
} from "../utils/handleUserAccount";

const defaultModalState = {
	type: null,
	product: null,
	behavior: null,
};

const Root = () => {
	const [userId, setUserId] = useState(null);
	const [cart, setCart] = useState(null);
	const [imageUrls, setImageUrls] = useState(null);
	const [error, setError] = useState(null);

	const [modalState, setModalState] = useState(defaultModalState);

	useEffect(() => {
		let ignore = false;
		const auth = initialAuth();

		const unsubscribe = auth.onAuthStateChanged(async googleLogin => {
			try {
				const hasRegister =
					!ignore &&
					googleLogin &&
					(await handleCheckUser(googleLogin.uid));

				!ignore &&
					googleLogin &&
					!hasRegister &&
					(await handleRegisterUser(googleLogin));

				!ignore && setUserId(googleLogin?.uid ?? "");
				!ignore && handleGetUserCart(googleLogin?.uid);
			} catch (error) {
				console.error(error);
				setError("Service temporarily unavailable");
			}
		});

		const handleFetchImageUrls = async () => {
			const imageResources = [
				"images/home/background.jpg",
				"images/contact/background.jpg",
			];
			try {
				const imageUrlsData = await Promise.all([
					...imageResources.map(url => getStorageImage(url)),
				]);

				const imageUrlsResult = await Promise.all(
					imageUrlsData.map(url => preLoadImage(url))
				);

				!ignore && setImageUrls(imageUrlsResult);
			} catch (error) {
				console.error(error);
				setError("Service temporarily unavailable");
			}
		};

		handleFetchImageUrls();

		return () => {
			ignore = true;
			unsubscribe();
		};
	}, []);

	const handleGetUserCart = async userId => {
		try {
			const cartData = userId && (await getUserCart(userId));

			const cartResult =
				!cartData || cartData.empty
					? []
					: cartData.docs.map(item => ({
							id: item.id,
							...item.data(),
					  }));

			setCart(cartResult);
		} catch (error) {
			console.error(error);
			setError("Service temporarily unavailable");
		}
	};

	const handleOpenModal = (type, product = null, behavior = null) =>
		setModalState({
			type,
			product,
			behavior,
		});

	return (
		<RootContext>
			<div className="app">
				<Header />

				<div data-testid="content" className={"content"}>
					{loading && (
						<div data-testid="loading" className="loading">
							<Icon path={mdiLoading} spin={1} size={3} />
							Loading...
						</div>
					)}
					{error && <Error message={error} />}
					{!loading && !error && (
						<Outlet
							context={{
								imageUrls,
							}}
						/>
					)}
					<Footer />
				</div>
				<Modal />
			</div>
		</RootContext>
	);
};

export default Root;
