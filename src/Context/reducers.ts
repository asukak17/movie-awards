import { Reducer } from "react";
import { actions, InitialStateType } from "./types";

export const mainReducer: Reducer<InitialStateType, actions> = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULT":
      return {
        ...state,
        SearchResult: action.payload,
      };
    case "ADD_NOMINATION":
      return {
        ...state,
        nominations: [...state.nominations, action.payload],
      };
    case "REMOVE_NOMINATION":
      return {
        ...state,
        nominations: state.nominations.filter((movie) => movie.imdbID !== action.payload.imdbID),
      };
    case "SET_NOMINATIONS":
      return {
        ...state,
        nominations: action.payload,
      };
    default:
      return state;
  }
};
