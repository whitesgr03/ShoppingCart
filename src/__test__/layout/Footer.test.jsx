import { render } from "@testing-library/react";

import Footer from "../../components/layout/Footer";

describe("Footer component", () => {
	it("Should render Footer component", () => {
		const { container } = render(<Footer />);

		expect(container).toMatchSnapshot();
	});
});
