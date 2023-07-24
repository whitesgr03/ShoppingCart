import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Root from "../../App/Root";

import fetchBackgroundImageUrl from "../../utils/fetchBackgroundImageUrl";
import fetchProducts from "../../utils/fetchProducts";

let mockLocation = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => mockLocation,
}));

let mockBackgroundImageUrl = null;

jest.mock("../../utils/fetchBackgroundImageUrl", () => ({
	__esModule: true,
	...jest.requireActual("../../utils/fetchBackgroundImageUrl"),
	default: jest.fn(async () => mockBackgroundImageUrl),
}));

let mockProducts = null;

jest.mock("../../utils/fetchProducts", () => ({
	__esModule: true,
	...jest.requireActual("../../utils/fetchProducts"),
	default: jest.fn(async () => mockProducts),
}));

describe("Renders Root Component", () => {
	it("Should fetch BackgroundImageUrl with home path", async () => {
		mockLocation = {
			pathname: "/",
		};

		mockBackgroundImageUrl = "";

		const routes = [
			{
				path: "/",
				element: <Root />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const loading = screen.getByTestId("loading");

		expect(loading).toBeInTheDocument();

		await waitFor(() => {
			expect(fetchBackgroundImageUrl).toBeCalled();
		});
	});
	it("Should fetch BackgroundImageUrl with contact path", async () => {
		mockLocation = {
			pathname: "/contact",
		};

		mockBackgroundImageUrl = "";

		const routes = [
			{
				path: "/",
				element: <Root />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const loading = screen.getByTestId("loading");

		expect(loading).toBeInTheDocument();

		await waitFor(() => {
			expect(fetchBackgroundImageUrl).toBeCalled();
		});
	});
	it("Should fetch products with shop path", async () => {
		mockLocation = {
			pathname: "/shop",
		};

		mockProducts = [
			{
				id: 0,
				name: "fakeBag",
				url: "../",
				price: 19.9,
			},
			{
				id: 1,
				name: "fakePants",
				url: "../",
				price: 19.9,
			},
		];

		const routes = [
			{
				path: "/",
				element: <Root />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ["/"],
		});

		render(<RouterProvider router={router} />);

		const loading = screen.getByTestId("loading");

		expect(loading).toBeInTheDocument();

		await waitFor(() => {
			expect(fetchProducts).toBeCalledTimes(1);
		});

		expect(loading).not.toBeInTheDocument();
	});
});
