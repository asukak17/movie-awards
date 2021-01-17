import { IResponse, IResult, ActionTypes } from "../Types";

export type payload = {
  [ActionTypes.setResult]: IResponse;
  [ActionTypes.addNomination]: IResult;
  [ActionTypes.setNominations]: IResult[];
  [ActionTypes.removeNomination]: IResult;
  [ActionTypes.setNominationCompleted]: boolean;
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
