import "../style/app.css";

import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Modal from "./modals/Modal";
import ModalCart from "./modals/ModalCart";
import ModalCartList from "./modals/ModalCartList";
import ModalProductAlert from "./modals/ModalProductAlert";
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

	const handleCloseModule = e =>
		e.target.className.includes("close") &&
		setModalState(defaultModalState);

	return (
		<div className="app">
			{(!cart || !imageUrls) && !error && <Loading />}
			{error && <Error message={error} />}
			{cart && imageUrls && !error && (
				<>
					<Modal
						modalState={modalState}
						onCloseModule={handleCloseModule}
					>
						<ModalCart
							cart={cart}
							active={modalState.type === "cart"}
							onOpenModule={handleOpenModal}
						>
							<ModalCartList
								cart={cart}
								userId={userId}
								onError={setError}
								onGetUserCart={handleGetUserCart}
								onOpenModule={handleOpenModal}
							/>
						</ModalCart>

						<ModalProductAlert
							userId={userId}
							product={modalState.product}
							behavior={modalState.behavior}
							active={modalState.type === "alert"}
							onError={setError}
							onGetUserCart={handleGetUserCart}
							onOpenModule={handleOpenModal}
						/>
					</Modal>
					<Header
						cart={cart}
						userId={userId}
						onOpenModal={handleOpenModal}
					/>
					<div data-testid="content" className="content">
						<Outlet
							context={{
								imageUrls,
								userId,
								cart,
								onOpenModule: handleOpenModal,
								onGetUserCart: handleGetUserCart,
							}}
						/>
						<Footer />
					</div>
				</>
			)}
		</div>
	);
};

export default Root;
