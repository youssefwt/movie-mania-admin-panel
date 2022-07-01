import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const initState = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(initState);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, initState);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
