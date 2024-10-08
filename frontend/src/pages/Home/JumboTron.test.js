import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import JumboTron from "./JumboTron";
import HomePageBG from "../../assets/HomePageBG.jpg";
import PizzaByteBlack from "../../assets/PizzaByteSmallBlack.png";

describe("JumboTron Component", () => {
  test("renders without crashing and displays elements", () => {
    render(<JumboTron />);

    // Check if the background image is present
    const bgImage = screen.getByAltText(
      "Home Page Background, plant in cup on table",
    );
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveAttribute("src", HomePageBG); // Verify the src attribute

    // Check if the PizzaByte logo is present
    const logo = screen.getByAltText("PizzaByte Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", PizzaByteBlack); // Verify the src attribute

    // Check if the tagline text is present
    const tagline = screen.getByText("Quality Ingredients. Delicious Pizza");
    expect(tagline).toBeInTheDocument();
  });
});
