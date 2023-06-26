import { render } from "@testing-library/react";

import Contact from "../components/Contact";

describe("Renders Contact Component", () => {
	it("Should return Contact DOM", () => {
		const { container } = render(<Contact />);

		expect(container).toMatchSnapshot();
	});
});
