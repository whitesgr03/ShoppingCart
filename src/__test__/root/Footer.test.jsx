import { render } from "@testing-library/react";

import Footer from "../../App/Footer";

describe("Renders Footer Component", () => {
	it("Should return Footer DOM", () => {
		const { container } = render(<Footer />);

		expect(container).toMatchSnapshot();
	});
});
