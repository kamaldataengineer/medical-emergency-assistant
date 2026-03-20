import { render, screen, fireEvent } from "@testing-library/react";
import FollowUpForm from "../FollowUpForm";

describe("FollowUpForm Component", () => {
  it("calls skip handler completely", () => {
    const skipMock = jest.fn();
    render(<FollowUpForm question="More info?" onSubmit={jest.fn()} onSkip={skipMock} />);
    
    // Simulate user ignoring secondary form
    const skipButton = screen.getByText(/Route Me Now/i);
    fireEvent.click(skipButton);
    expect(skipMock).toHaveBeenCalledTimes(1);
  });
});
