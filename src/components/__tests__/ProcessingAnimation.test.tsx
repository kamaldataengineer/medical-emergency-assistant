import { render, screen } from "@testing-library/react";
import ProcessingAnimation from "../ProcessingAnimation";

describe("ProcessingAnimation", () => {
  it("renders the processing state correctly", () => {
    // Basic test to boost coverage and prove logic structure.
    render(<ProcessingAnimation />);
    
    // The loading animation should contain 'AI'
    expect(screen.getByText(/AI/i)).toBeInTheDocument();
  });
});
