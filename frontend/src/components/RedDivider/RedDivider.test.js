// src/components/RedDivider.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RedDivider from "./RedDivider";

describe("RedDivider Component", () => {
  test("renders component", () => {
    render(<RedDivider />);

    // Check if the divider is in the document
    const divider = screen.getByTestId("red-divider");
    expect(divider).toBeInTheDocument();
  });

  test("has the correct class and styles", () => {
    render(<RedDivider />);

    // Check if the divider has the correct class
    const divider = screen.getByTestId("red-divider");
    expect(divider).toHaveClass("min-h-10");
    expect(divider).toHaveClass("min-w-full");
    expect(divider).toHaveClass("bg-red-600");
  });
});
