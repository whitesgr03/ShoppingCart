import { createContext, useReducer, useContext } from "react";
import cartReducer from "../components/modals/modalCartReducer";
import modalReducer from "../components/modals/modalReducer";

const cartContext = createContext([]);
const cartDispatchContext = createContext(cartReducer);

const useCart = () => useContext(cartContext);
const useCartDispatch = () => useContext(cartDispatchContext);

const modalContext = createContext(null);
const modalDispatchContext = createContext(modalReducer);

const useModal = () => useContext(modalContext);
const useModalDispatch = () => useContext(modalDispatchContext);

const RootProvider = ({ children }) => {
	const [cart, cartListDispatch] = useReducer(cartReducer, []);
	const [modal, modalDispatch] = useReducer(modalReducer, {
		modal: "",
		alertProduct: {
			state: "",
			product: null,
		},
	});

	return (
		<cartContext.Provider value={cart}>
			<cartDispatchContext.Provider value={cartListDispatch}>
				<modalContext.Provider value={modal}>
					<modalDispatchContext.Provider value={modalDispatch}>
						{children}
					</modalDispatchContext.Provider>
				</modalContext.Provider>
			</cartDispatchContext.Provider>
		</cartContext.Provider>
	);
};

export {
	RootProvider as default,
	useCart,
	useCartDispatch,
	useModal,
	useModalDispatch,
};
