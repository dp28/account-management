import { combineReducers } from "redux";
import {
  PeopleState,
  InitialState as InitialPeopleState,
  reducer as peopleReducer,
} from "./people";
import { Events } from "./events";

export interface RootState {
  people: PeopleState;
}

export const InitialRootState: RootState = {
  people: InitialPeopleState,
};

export type DomainReducer = (state: RootState, event: Events) => RootState;

export const reducer: DomainReducer = combineReducers({
  people: peopleReducer,
});
