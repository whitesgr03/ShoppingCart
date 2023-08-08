const modalReducer = (state, action) => {
	switch (action.type) {
		case "cart": {
			return { modal: "showCart", ...state };
		}
		case "alert": {
			return {
				modal: "showAlert",
				alertProduct: action.item,
			};
		}
		case "close": {
			return { modal: "", ...state };
		}
		default:
			return "Unknown action: " + action.type;
	}
};

export default modalReducer;
