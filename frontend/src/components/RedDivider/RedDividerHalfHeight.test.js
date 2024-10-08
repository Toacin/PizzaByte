import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RedDividerHalfHeight from "./RedDividerHalfHeight";

describe("RedDividerHalfHeight Component", () => {
  test("renders component", () => {
    render(<RedDividerHalfHeight />);

    // Check if the divider is in the document
    const divider = screen.getByTestId("red-divider-small");
    expect(divider).toBeInTheDocument();
  });

  test("has the correct class and styles", () => {
    render(<RedDividerHalfHeight />);

    // Check if the divider has the correct class
    const divider = screen.getByTestId("red-divider-small");
    expect(divider).toHaveClass("min-h-1");
    expect(divider).toHaveClass("min-w-full");
    expect(divider).toHaveClass("bg-red-600");
  });
});
