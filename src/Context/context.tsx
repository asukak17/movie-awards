/*context.tsx*/

import React, { createContext, useReducer } from "react";
import { mainReducer } from "./reducers";
import { InitialStateType, actions } from "./types";

const initialState: InitialStateType = {
  nominations: [],
  nominationCompleted: false,
  searchResult: null,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
