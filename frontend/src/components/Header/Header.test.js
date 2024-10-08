import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import auth from "../../utils/auth";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock the auth utility for the loggedIn and logout functions
jest.mock("../../utils/auth", () => ({
  loggedIn: jest.fn(),
  logout: jest.fn(),
}));

describe("Header Component", () => {
  let navigateMock;

  beforeEach(() => {
    // Create a mock function
    navigateMock = jest.fn();
    // Mock useNavigate to return the mock function
    useNavigate.mockReturnValue(navigateMock);
  });

  test("renders logo and redirects to home when clicked", () => {
    render(<Header />);

    const logo = screen.getByAltText("PizzaByte Logo");
    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("should render sign in when not logged in", () => {
    // mock false logged in state
    auth.loggedIn.mockReturnValue(false);

    render(<Header />);

    const signInButton = screen.getByText("Sign In");
    expect(signInButton).toBeInTheDocument();

    fireEvent.click(signInButton);
    expect(navigateMock).toHaveBeenCalledWith("/authentication");
  });

  test("should render log out button when user is logged in", () => {
    auth.loggedIn.mockReturnValue(true);

    render(<Header />);

    const logoutButton = screen.getByText("Log Out");
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(auth.logout).toHaveBeenCalled();
  });
});
