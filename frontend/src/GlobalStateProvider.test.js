import React from "react";
import { render, screen, act } from "@testing-library/react";
import { GlobalStateProvider, useGlobalState } from "./GlobalStateProvider";

// Test component to consume the global state
const TestComponent = () => {
  const { state, dispatch } = useGlobalState();

  return (
    <div>
      <h1 data-testid="toppings-title">Toppings</h1>
      <button
        onClick={() =>
          dispatch({ type: "SET_TOPPINGS", payload: ["cheese", "pepperoni"] })
        }
      >
        Set Toppings
      </button>
      <ul data-testid="toppings-list">
        {state.toppings.map((topping, index) => (
          <li key={index}>{topping}</li>
        ))}
      </ul>
    </div>
  );
};

describe("GlobalStateProvider", () => {
  test("initial state is correct", () => {
    render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>,
    );

    // Check initial state of toppings
    const toppingsList = screen.getByTestId("toppings-list");

    // Initially, toppings should be empty
    expect(toppingsList.children.length).toBe(0);
  });

  test("can set toppings", () => {
    render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>,
    );

    const setToppingsButton = screen.getByText("Set Toppings");

    act(() => {
      setToppingsButton.click();
    });

    // Check if the toppings are set correctly
    const toppingsList = screen.getByTestId("toppings-list");
    // Two toppings should be added
    expect(toppingsList.children.length).toBe(2);
    // Check first topping
    expect(toppingsList.children[0].textContent).toBe("cheese");
    // Check second topping
    expect(toppingsList.children[1].textContent).toBe("pepperoni");
  });
});
