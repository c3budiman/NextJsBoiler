import { render, screen } from "@testing-library/react";
import App from "../src/pages/index";
require('jest-canvas-mock');

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Welcome!" })
    ).toBeInTheDocument();
  });
});