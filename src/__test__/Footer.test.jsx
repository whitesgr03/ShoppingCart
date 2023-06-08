import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Footer from "../components/Footer";

describe("Renders Footer Component", () => {
	it("Should return Footer DOM", () => {
		const { container } = render(
			<MemoryRouter initialEntries={["/"]}>
				<Footer />
			</MemoryRouter>
		);

		const actual = container;

		expect(actual).toMatchSnapshot();
	});
});
