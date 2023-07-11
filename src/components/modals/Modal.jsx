import ModalCart from "./ModalCart";
import ModalAlert from "./ModalAlert";

import { useModal, useModalDispatch } from "../../App/RootContext";

const Modal = () => {
	const { modal } = useModal();

	const dispatch = useModalDispatch();

	const handleCheckTarget = e =>
		(e.target.classList.contains("shadow") ||
			e.target.classList.contains("close")) &&
		dispatch({
			type: "close",
		});

	return (
		<div
			data-testid="shadow"
			className={`shadow ${modal ? `${modal} active` : ""}`}
			onPointerUp={handleCheckTarget}
		>
			<ModalCart />
			<ModalAlert />
		</div>
	);
};

export { Modal as default };
