import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext();

export const ToastContextProvider = (props) => {
  const notifications = [
    {
      id: uuidv4(),
      type: "SUCCESS",
      title: "Successfuly fetched data",
      message: "Successfully retrieved all posts",
    },
    {
      id: uuidv4(),
      type: "INFO",
      title: "Informational title",
      message: "This is for your info",
    },
    {
      id: uuidv4(),
      type: "WARNING",
      title: "warning title",
      message: "This is a warning message",
    },
    {
      id: uuidv4(),
      type: "DANGER",
      title: "Error title",
      message: "This is an error message",
    },
  ];
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, action.payload];
      case "DELETE_NOTIFICATION":
        return state.filter(
          (notification) => notification.id !== action.payload
        );
      default:
        return state;
    }
  }, notifications);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ToastContext.Provider>
  );
};
