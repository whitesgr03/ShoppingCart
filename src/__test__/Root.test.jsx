import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Root from "../components/App";

import getBackgroundImageUrl from "../utils/handleBackgroundImageUrl";
import getAllProducts from "../utils/handleProducts";

let mockLocation = null;
let mockNavigate = null;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => mockLocation,
	useNavigate: jest.fn(() => mockNavigate),
}));

jest.mock("../firebase-config", () => ({
	...jest.requireActual("../firebase-config"),
	initialAuth: () => ({
		onAuthStateChanged: jest.fn(() => jest.fn()),
	}),
}));

jest.mock("../utils/handleBackgroundImageUrl");
jest.mock("../utils/handleProducts");

describe("Renders Root Component", () => {
	it("Should fetch BackgroundImageUrl with home path", async () => {
		mockLocation = {
			pathname: "/",
		};

		getBackgroundImageUrl.mockReturnValueOnce({
			message: "Get background-image url success.",
			success: true,
			data: "home path",
		});

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

		await waitFor(() => {
			expect(getBackgroundImageUrl).toBeCalled();
		});
	});
	it("Should fetch BackgroundImageUrl with contact path", async () => {
		mockLocation = {
			pathname: "/contact",
		};

		getBackgroundImageUrl.mockReturnValueOnce({
			message: "Get background-image url success.",
			success: true,
			data: "contact path",
		});

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

		await waitFor(() => {
			expect(getBackgroundImageUrl).toBeCalled();
		});
	});
	it("Should failed to fetch BackgroundImageUrl with home path and navigate", async () => {
		mockLocation = {
			pathname: "/",
		};

		mockNavigate = jest.fn();

		getBackgroundImageUrl.mockReturnValueOnce({
			message: "fetch failed",
			success: false,
		});

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

		await waitFor(() => {
			expect(mockNavigate).toBeCalledTimes(1);
		});
	});
	it("Should fetch products with shop path", async () => {
		mockLocation = {
			pathname: "/shop",
		};

		getAllProducts.mockReturnValueOnce({
			message: "Get products success.",
			success: true,
			data: [
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
			],
		});

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

		await waitFor(() => {
			expect(getAllProducts).toBeCalledTimes(1);
		});
	});
	it("Should failed to fetch products with shop path", async () => {
		mockLocation = {
			pathname: "/shop",
		};

		mockNavigate = jest.fn();

		getAllProducts.mockReturnValueOnce({
			message: "fetch failed",
			success: false,
		});

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

		await waitFor(() => {
			expect(mockNavigate).toBeCalledTimes(1);
		});
	});
	it("Should load image after loading", async () => {
		mockLocation = {
			pathname: "/",
		};

		getBackgroundImageUrl.mockReturnValueOnce({
			message: "Get background-image url success.",
			success: true,
			data: "home path",
		});

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

		const image = screen.getByRole("img", { hidden: true });

		const loading = screen.getByTestId("loading");

		expect(loading).toBeInTheDocument();

		await waitFor(async () => {
			await fireEvent.load(image);
		});

		expect(loading).not.toBeInTheDocument();
	});
});
