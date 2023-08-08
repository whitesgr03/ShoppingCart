import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { updateUserCartItem } from "../../utils/handleUserCarts";

import ModalCartList from "../../components/modals/ModalCartList";

jest.mock("../../utils/handleUserCarts");

describe("Renders ModalCartList Component", () => {
	it("Should show Remove Alert modal DOM with click event", async () => {
		mockModalDispatch = jest.fn();

		const mockCartData = [
			{
				id: 0,
				name: "fake",
				url: "../",
				price: 19.9,
				quantity: 1,
			},
		];
		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: <ModalCartList list={mockCartData} />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const button = screen.getByTestId("removeBtn");

		await user.pointer({ keys: "[MouseLeft]", target: button });

		expect(mockModalDispatch).toBeCalledTimes(1);
	});
	it("Should change select value with change event", async () => {
		const mockCartData = {
			id: 0,
			name: "fake",
			url: "../",
			price: 19.9,
			quantity: 1,
		};

		const updateFetchResult = {
			message: "Update cart item success.",
			success: true,
		};

		const mockIsLoad = false;

		const mockModalDispatch = jest.fn();
		const mockCartDispatch = jest.fn();
		const mockOnLoading = jest.fn();

		useModalDispatch.mockReturnValueOnce(mockModalDispatch);
		useCartDispatch.mockReturnValueOnce(mockCartDispatch);
		updateUserCartItem.mockReturnValueOnce(updateFetchResult);

		const user = userEvent.setup();

		const routes = [
			{
				path: "/",
				element: (
					<ModalCartList
						list={[mockCartData]}
						isLoading={mockIsLoad}
						onLoading={mockOnLoading}
					/>
				),
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const select = screen.getByTestId("quantity");

		expect(select).toHaveValue("1");

		await user.selectOptions(select, "2");

		expect(updateUserCartItem).toBeCalledTimes(1);
		expect(mockOnLoading).toBeCalledTimes(2);
		expect(mockCartDispatch).toBeCalledTimes(1);
	});
});
