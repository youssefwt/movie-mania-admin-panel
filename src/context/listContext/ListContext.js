import { createContext, useReducer } from "react";
import ListReducer from "./ListReducer";

const initState = {
  lists: [],
  isFetching: false,
  error: false,
};

export const ListContext = createContext(initState);

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initState);

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
