import AuthService from "./auth";
import { jwtDecode } from "jwt-decode";

// Mock the localStorage and jwtDecode
beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writable: true,
  });

  // Mock window.location
  // Delete existing location object
  delete window.location;
  // Create a mock for the assign method
  window.location = { assign: jest.fn() };
});

jest.mock("jwt-decode");

describe("AuthService", () => {
  const mockToken = "mockToken";
  const mockDecodedToken = { exp: Math.floor(Date.now() / 1000) + 60 };

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test("should retrieve profile from a valid token", () => {
    // Mock implementation of getToken and jwtDecode
    AuthService.getToken = jest.fn(() => mockToken);
    jwtDecode.mockReturnValue(mockDecodedToken);

    const profile = AuthService.getProfile();
    expect(profile).toEqual(mockDecodedToken);
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
  });

  test("should return true for loggedIn when token is valid", () => {
    AuthService.getToken = jest.fn(() => mockToken);
    jwtDecode.mockReturnValue(mockDecodedToken);

    const isLoggedIn = AuthService.loggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test("should return false for loggedIn when token is expired", () => {
    // Mock an expired token
    const expiredToken = { exp: Math.floor(Date.now() / 1000) - 60 };
    AuthService.getToken = jest.fn(() => mockToken);
    jwtDecode.mockReturnValue(expiredToken);

    const isLoggedIn = AuthService.loggedIn();
    expect(isLoggedIn).toBe(false);
  });

  test("should return false for loggedIn when no token exists", () => {
    AuthService.getToken = jest.fn(() => null);

    const isLoggedIn = AuthService.loggedIn();
    expect(isLoggedIn).toBe(false);
  });

  test("should save token and redirect on login", () => {
    AuthService.login(mockToken);

    expect(localStorage.setItem).toHaveBeenCalledWith("id_token", mockToken);
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });

  test("should remove token and redirect on logout", () => {
    AuthService.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("id_token");
    expect(window.location.assign).toHaveBeenCalledWith("/");
  });
});
