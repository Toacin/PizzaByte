import React from "react";
import { render, screen } from "@testing-library/react";
import TestComponent from "./TestComponent";

describe("TestComponent", () => {
  test("renders the correct h1 text", () => {
    render(<TestComponent />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toHaveTextContent("Test Component");
  });

  test("renders the correct h2 text", () => {
    const dynamicText = "Dynamic H2 Text";
    render(<TestComponent dynamicH2={dynamicText} />);

    const h2Element = screen.getByRole("heading", { level: 2 });
    expect(h2Element).toHaveTextContent(dynamicText);
  });
});
