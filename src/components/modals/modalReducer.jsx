const modalReducer = (state, action) => {
	switch (action.type) {
		case "cart": {
			return { ...state, modal: "showCart" };
		}
		case "alert": {
			return {
				modal: "showAlert",
				alertProduct: action.item,
			};
		}
		case "close": {
			return { ...state, modal: "" };
		}
		default:
			throw Error("Unknown action: " + action.type);
	}
};

export default modalReducer;
