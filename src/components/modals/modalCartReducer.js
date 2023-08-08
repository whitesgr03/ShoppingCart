const cartReducer = (state, action) => {
	switch (action.type) {
		case "initialize_cart": {
			return action.cart;
		}

		case "added": {
			return [...state, action.product];
		}

		case "changed": {
			return state.map(item =>
				item.id === action.product.id ? action.product : item
			);
		}

		case "deleted": {
			return state.filter(item => item.id !== action.id);
		}

		default:
			throw Error("Unknown action: " + action.type);
	}
};

export default cartReducer;
