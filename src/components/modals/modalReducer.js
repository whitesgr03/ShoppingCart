const modalReducer = (state, action) => {
	switch (action.type) {
		case "cart": {
			return { ...state, modal: "showCart" };
		}
		case "alert": {
			return {
				alertProduct: action.item,
				modal: "showAlert",
			};
		}
		case "close": {
			return { ...state, modal: "" };
		}
		default:
			return "Unknown action: " + action.type;
	}
};

export default modalReducer;
