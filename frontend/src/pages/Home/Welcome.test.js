import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Welcome from "./Welcome";

describe("Welcome Component", () => {
  test("renders and displays elements", () => {
    render(<Welcome />);

    // Check if the welcome heading is present
    const heading = screen.getByTestId("welcome-h1");
    expect(heading).toBeInTheDocument();

    // Check if the pizza slice icon is present
    const icon = screen.getByTestId("pizzabyte-icon");
    expect(icon).toBeInTheDocument();

    // Check if the welcome paragraph is present
    const paragraph = screen.getByTestId("welcome-message");
    expect(paragraph).toBeInTheDocument();
  });
});
