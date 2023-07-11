const cartReducer = (state, action) => {
	switch (action.type) {
		case "added": {
			return state.find(item => item.productId === action.item.productId)
				? state.map(item =>
						item.productId === action.item.productId
							? {
									...item,
									quantity:
										item.quantity + action.item.quantity,
							  }
							: item
				  )
				: [
						...state,
						{
							...action.item,
							id: state.length === 0 ? 0 : state.at(-1).id + 1,
						},
				  ];
		}

		case "changed": {
			return state.map(item =>
				item.id === action.item.id ? action.item : item
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
