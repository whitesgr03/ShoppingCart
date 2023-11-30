import { render, screen } from "@testing-library/react";

import Error from "../components/Error";

describe("Error Component", () => {
	it("Should render message if message is provide", () => {
		const mockMessage = "error";

		render(<Error message={mockMessage} />);

		const element = screen.getByRole("heading", {
			leave: 1,
			name: mockMessage,
		});

		expect(element).toBeInTheDocument();
	});
});
