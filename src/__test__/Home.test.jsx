import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Home from "../components/Home";

describe("Renders Home Component", () => {
	it("Should return Home DOM", () => {
		const { container } = render(
			<MemoryRouter initialEntries={["/"]}>
				<Home />
			</MemoryRouter>
		);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});
});
