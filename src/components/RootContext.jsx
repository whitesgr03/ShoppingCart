import { createContext, useReducer, useContext } from "react";
import cartReducer from "./modals/modalCartReducer";
import modalReducer from "./modals/modalReducer";

const cartContext = createContext([]);
const cartDispatchContext = createContext(cartReducer);

const useCart = () => useContext(cartContext);
const useCartDispatch = () => useContext(cartDispatchContext);

const modalContext = createContext(null);
const modalDispatchContext = createContext(modalReducer);

const useModal = () => useContext(modalContext);
const useModalDispatch = () => useContext(modalDispatchContext);

const RootContext = ({ children }) => {
	const [cart, cartListDispatch] = useReducer(cartReducer, []);
	const [modal, modalDispatch] = useReducer(modalReducer, {
		modal: "",
		alertProduct: {
			state: "",
			product: null,
		},
	});

	return (
		<modalContext.Provider value={modal}>
			<modalDispatchContext.Provider value={modalDispatch}>
				<cartContext.Provider value={cart}>
					<cartDispatchContext.Provider value={cartListDispatch}>
						{children}
					</cartDispatchContext.Provider>
				</cartContext.Provider>
			</modalDispatchContext.Provider>
		</modalContext.Provider>
	);
};

export {
	RootContext as default,
	useCart,
	useCartDispatch,
	useModal,
	useModalDispatch,
};
