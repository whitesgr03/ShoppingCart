import { useState } from "react";

import ModalCart from "./ModalCart";
import ModalProductAlert from "./ModalProductAlert";

import { useModal, useModalDispatch } from "../../App/RootContext";

const Modal = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { modal } = useModal();

	const dispatch = useModalDispatch();

	const handleCloseModule = e => {
		const classList = e.target.classList;

		!isLoading &&
			(classList.contains("shadow") || classList.contains("close")) &&
			dispatch({
				type: "close",
			});
	};

	return (
		<div
			data-testid="shadow"
			className={`shadow ${modal ? `${modal} active` : ""}`}
			onPointerUp={handleCloseModule}
		>
			<ModalCart />
			<ModalAlert />
		</div>
	);
};

export { Modal as default };
