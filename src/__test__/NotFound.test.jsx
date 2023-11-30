import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import NotFoundPage from "../components/NotFound";

describe("NotFound Component", () => {
	it("Should render NotFound component", () => {
		const { container } = render(<NotFoundPage />, {
			wrapper: BrowserRouter,
		});

		expect(container).toMatchSnapshot();
	});
});
