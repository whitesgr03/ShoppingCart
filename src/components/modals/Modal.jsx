import "../../style/modals/modal.css";

const Modal = ({ modalState, onCloseModule, children }) => {
	return (
		<div className="modal">
			<div
				data-testid="shadow"
				className={`shadow ${modalState.type ? `active close` : ""}`}
				onClick={onCloseModule}
			>
				{children}
			</div>
		</div>
	);
};

export { Modal as default };
