import React, { createContext, useReducer, useContext } from "react";

// Define initial state
const initialState = {
  firstName: "",
  email: "",
  role: "user",
  token: "",
  loggedIn: false,
  test: false,
};

// Define action types
const actionTypes = {
  SET_FIRST_NAME: "SET_FIRST_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_ROLE: "SET_ROLE",
  SET_TOKEN: "SET_TOKEN",
  SET_LOGGED_IN: "SET_LOGGED_IN",
  SET_TEST: "SET_TEST",
};

// Create a reducer function
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_ROLE:
      return { ...state, role: action.payload };
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case actionTypes.SET_LOGGED_IN:
      return { ...state, loggedIn: action.payload };
    case actionTypes.SET_TEST:
      return { ...state, test: action.payload };
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
