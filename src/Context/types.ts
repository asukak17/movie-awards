import { IResponse, IResult } from "../Components/SearchResult";

export enum Types {
  setResult = "SET_SEARCH_RESULT",
  addNomination = "ADD_NOMINATION",
  removeNomination = "REMOVE_NOMINATION",
  setNominations = "SET_NOMINATIONS",
  setNominationCompleted = "SET_NOMINATION_COMPLETED",
}

export type payload = {
  [Types.setResult]: IResponse;
  [Types.addNomination]: IResult;
  [Types.setNominations]: IResult[];
  [Types.removeNomination]: IResult;
  [Types.setNominationCompleted]: boolean;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// export type searchActions = ActionMap<searchPayload>[keyof ActionMap<searchPayload>];
export type actions = ActionMap<payload>[keyof ActionMap<payload>];

export type InitialStateType = {
  nominations: IResult[];
  nominationCompleted: boolean;
  searchResult: IResponse | null;
};
