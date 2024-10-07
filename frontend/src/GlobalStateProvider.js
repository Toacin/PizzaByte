import React, { createContext, useReducer, useContext } from "react";

// Define initial state
const initialState = {
  toppings: [],
};

// Define action types
const actionTypes = {
  SET_TOPPINGS: "SET_TOPPINGS",
};

// Create a reducer function
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOPPINGS:
      return { ...state, toppings: action.payload };
    default:
      return state;
  }
};

// Create the context
const GlobalStateContext = createContext();

// GlobalStateProvider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
