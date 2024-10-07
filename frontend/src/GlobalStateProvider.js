import React, { createContext, useReducer, useContext } from "react";
import auth from "./utils/auth";

// Define initial state
const initialState = {};

initialState.role = auth.loggedIn() ? auth.getProfile().role : "user";

// Define action types
const actionTypes = {
  SET_ROLE: "SET_ROLE",
};

// Create a reducer function
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ROLE:
      return { ...state, role: action.payload };
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
