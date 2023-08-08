import { useState } from "react";

import ModalCart from "./ModalCart";
import ModalProductAlert from "./ModalProductAlert";

import { useModal, useModalDispatch } from "../../App/RootContext";

const Modal = () => {
	const [isLoading, setIsLoading] = useState(false);

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
