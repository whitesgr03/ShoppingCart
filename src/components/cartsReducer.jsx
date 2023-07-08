const cartReducer = (cart, action) => {
	switch (action.type) {
		case "added": {
			return cart.find(item => item.productId === action.item.productId)
				? cart.map(item =>
						item.productId === action.item.productId
							? {
									...item,
									quantity:
										item.quantity + action.item.quantity,
							  }
							: item
				  )
				: [
						...cart,
						{
							...action.item,
							id: cart.length === 0 ? 0 : cart.at(-1).id + 1,
						},
				  ];
		}

		case "changed": {
			return cart.map(item =>
				item.id === action.item.id ? action.item : item
			);
		}

		case "deleted": {
			return cart.filter(item => item.id !== action.id);
		}

		default:
			throw Error("Unknown action: " + action.type);
	}
};

export default cartReducer;
