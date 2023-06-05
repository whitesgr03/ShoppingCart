import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Root from "../components/Root";

describe("Renders Root Component", () => {
	it("Should return Root", () => {
		const { container } = render(
			<MemoryRouter initialEntries={["/"]}>
				<Root />
			</MemoryRouter>
		);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});
});
