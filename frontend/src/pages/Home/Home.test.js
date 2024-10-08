import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

// Mock the child components for simple tests
jest.mock("./JumboTron", () => () => <div data-testid="jumbo-tron" />);
jest.mock("./Welcome", () => () => <div data-testid="welcome" />);
jest.mock("./Classics", () => () => <div data-testid="classics" />);
jest.mock("./Toppings", () => () => <div data-testid="toppings" />);
jest.mock("../../components/RedDivider/RedDivider", () => () => (
  <div data-testid="red-divider" />
));
jest.mock("../../components/RedDivider/RedDividerHalfHeight", () => () => (
  <div data-testid="red-divider-half" />
));

describe("Home Component", () => {
  test("renders without crashing", () => {
    render(<Home />);

    // Check if all the components are rendered
    expect(screen.getByTestId("jumbo-tron")).toBeInTheDocument();
    expect(screen.getByTestId("red-divider")).toBeInTheDocument();
    expect(screen.getByTestId("welcome")).toBeInTheDocument();

    // Check for the half-height red divider twice, as it's rendered twice
    expect(screen.getAllByTestId("red-divider-half")).toHaveLength(2);

    expect(screen.getByTestId("classics")).toBeInTheDocument();
    expect(screen.getByTestId("toppings")).toBeInTheDocument();
  });
});
