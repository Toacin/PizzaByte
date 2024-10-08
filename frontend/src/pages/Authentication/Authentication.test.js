import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Authentication from "./Authentication";

// Mock the child components for simple tests
jest.mock("./LoginContainer", () => () => (
  <div data-testid="login-container" />
));
jest.mock("./SignupContainer", () => () => (
  <div data-testid="signup-container" />
));

describe("Authentication Component", () => {
  test("renders without crashing", () => {
    render(<Authentication />);

    // Check if the main heading is rendered
    expect(screen.getByText("Authentication")).toBeInTheDocument();

    // Check if the LoginContainer and SignupContainer are rendered
    expect(screen.getByTestId("login-container")).toBeInTheDocument();
    expect(screen.getByTestId("signup-container")).toBeInTheDocument();
  });
});
