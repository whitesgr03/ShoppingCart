import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Header from "../components/Header";

describe("Renders Header Component", () => {
	it("Should return Header", () => {
		const { container } = render(
			<MemoryRouter initialEntries={["/"]}>
				<Header />
			</MemoryRouter>
		);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});
});
