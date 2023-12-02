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

import { getUserCart } from "../utils/handleUserCart";

import {
	handleAuthState,
	handleCheckUser,
	handleCreateUser,
} from "../utils/handleUserAccount";

const defaultModalState = {
	type: null,
	product: null,
	behavior: null,
};

const AppContext = createContext(null);

const defaultCart = [];
const defaultUserId = "";

const App = () => {
	const [userId, setUserId] = useState(null);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState(defaultCart);
	const [imageUrls, setImageUrls] = useState({});
	const [AppError, setAppError] = useState(null);
	const [modalState, setModalState] = useState(defaultModalState);

	const handleGetUserCart = useCallback(async id => {
		try {
			const cartData = await getUserCart(id);

			const cartResult = cartData.empty
				? []
				: cartData.docs.map(item => ({
						id: item.id,
						...item.data(),
				  }));

			setCart(cartResult);
		} catch (error) {
			setAppError("Service temporarily unavailable");
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

	const handleCloseModal = useCallback(
		e =>
			e.target.className.includes("close") &&
			setModalState(defaultModalState),
		[]
	);

	useEffect(() => {
		let ignore = false;

		const handleUserLogin = async user => {
			try {
				const hasCreateUser = user && (await handleCheckUser(user.uid));

				!ignore &&
					user &&
					!hasCreateUser &&
					(await handleCreateUser(user));

				!ignore && user && setUserId(user.uid);
				!ignore && user && handleGetUserCart(user.uid);

				!ignore && !user && setUserId(defaultUserId);
				!ignore && !user && setCart(defaultCart);
			} catch (error) {
				setAppError("Service temporarily unavailable");
			}
		};

		const unsubscribe = handleAuthState(handleUserLogin);

		return () => {
			ignore = true;
			unsubscribe();
		};
	}, [handleGetUserCart]);

	return (
		<div className="app">
			{!cart && !AppError && <Loading />}
			{AppError && <Error message={AppError} />}
			{cart && !AppError && (
				<>
					<div className="modal">
						<div
							data-testid="shadow"
							className={`shadow ${
								modalState.type ? `active close` : ""
							}`}
							onClick={handleCloseModal}
						>
							<ModalCart
								cart={cart}
								active={modalState.type === "cart"}
								onOpenModal={handleOpenModal}
							>
								<ModalCartList
									cart={cart}
									userId={userId}
									setAppError={setAppError}
									onGetUserCart={handleGetUserCart}
									onOpenModal={handleOpenModal}
								/>
							</ModalCart>

							<ModalProductAlert
								userId={userId}
								product={modalState.product}
								behavior={modalState.behavior}
								active={modalState.type === "alert"}
								setAppError={setAppError}
								onGetUserCart={handleGetUserCart}
								onOpenModal={handleOpenModal}
							/>
						</div>
					</div>

					<Header
						userId={userId}
						setAppError={setAppError}
						onOpenModal={handleOpenModal}
					>
						<Badge cart={cart} />
					</Header>

					<div data-testid="content" className="content">
						<AppContext.Provider
							value={{
								userId,
								cart,
								imageUrls,
								setImageUrls,
								products,
								setProducts,
								setAppError,
								onOpenModal: handleOpenModal,
								onGetUserCart: handleGetUserCart,
							}}
						>
							<Outlet />
						</AppContext.Provider>
						<Footer />
					</div>
				</>
			)}
		</div>
	);
};

export { App as default, AppContext };
