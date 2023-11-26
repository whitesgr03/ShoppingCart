import "../style/app.css";

import { useState, useEffect, useCallback, createContext } from "react";
import { Outlet } from "react-router-dom";

import Header, { Badge } from "./layout/Header";
import Footer from "./layout/Footer";

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

const App = () => {
	const [userId, setUserId] = useState(null);
	const [cart, setCart] = useState(null);
	const [imageUrls, setImageUrls] = useState(null);
	const [error, setError] = useState(null);
	const [modalState, setModalState] = useState(defaultModalState);

	const handleGetUserCart = useCallback(async id => {
		try {
			const cartData = id && (await getUserCart(id));

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
	}, []);

	const handleOpenModal = useCallback(
		(type, product = null, behavior = null) =>
			setModalState({
				type,
				product,
				behavior,
			}),
		[]
	);

	const handleCloseModule = useCallback(
		e =>
			e.target.className.includes("close") &&
			setModalState(defaultModalState),
		[]
	);

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

				const [home, contact] = imageUrlsResult;

				!ignore &&
					setImageUrls({
						home,
						contact,
					});
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
	}, [handleGetUserCart]);

	return (
		<div className="app">
			{(!cart || !imageUrls) && !error && <Loading />}
			{error && <Error message={error} />}
			{cart && imageUrls && !error && (
				<>
					<div className="modal">
						<div
							data-testid="shadow"
							className={`shadow ${
								modalState.type ? `active close` : ""
							}`}
							onClick={handleCloseModule}
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
						</div>
					</div>

					<Header
						userId={userId}
						onError={setError}
						onOpenModal={handleOpenModal}
					>
						<Badge cart={cart} />
					</Header>

					<div data-testid="content" className="content">
						<Outlet
							context={{
								homeUrl: imageUrls["home"],
								contactUrl: imageUrls["contact"],
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

export {
	App as default,
};
