
const Modal = (
	{ cartList, showModal, onToggleModal, onEditItem }
) => {
	const handleCloseModal = e =>
		(e.target.classList.contains("shadow") ||
			e.target.classList.contains("close")) &&
		onToggleModal(false);

	return (
		<div
			data-testid="shadow"
			className={`shadow 
			${showModal ? "active" : ""}
			`
			}
			onClick={handleCloseModal}
		>
			{cartList &&
				<Cart
				cartList={cartList} onEditItem={onEditItem}
			/>}
		</div>
	);
};
