import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
    case "LOGIN_USER":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "ADMIN":
      localStorage.setItem("token", payload.token);
      return {
        isAdmin: true,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
