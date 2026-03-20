import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";

jest.mock("@react-google-maps/api", () => ({
  GoogleMap: ({ children }: any) => <div data-testid="mock-google-map">{children}</div>,
  LoadScript: ({ children }: any) => <div data-testid="mock-load-script">{children}</div>,
  Marker: () => <div data-testid="mock-marker" />,
}));

const mockData = {
  hospitalName: "Memorial Hospital",
  distance: "2.1 miles",
  eta: "8 mins",
  department: "Emergency",
  severity: "CRITICAL" as const,
  summary: "Urgent medical assistance required.",
  firstAidAdvice: "Do not move the neck. Apply pressure to wounds.",
  alternativeFacility: {
    name: "CVS Pharmacy",
    distance: "0.5 miles",
    type: "First Aid Supplies",
  }
};

describe("Dashboard Component", () => {
  it("renders essential triage information and golden-hour advice", () => {
    render(<Dashboard data={mockData} onReset={jest.fn()} />);
    
    // Check if original triage metadata is present
    expect(screen.getByText(/Memorial Hospital/i)).toBeInTheDocument();
    
    // Check if new firstAidAdvice renders correctly
    expect(screen.getByText(/Golden Hour Advice/i)).toBeInTheDocument();
    expect(screen.getByText(/Do not move the neck/i)).toBeInTheDocument();

    // Check alternative facility
    expect(screen.getByText(/Alternative: CVS Pharmacy/i)).toBeInTheDocument();
  });
});
