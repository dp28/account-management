import { combineReducers } from "redux";
import {
  PeopleState,
  InitialState as InitialPeopleState,
  reducer as peopleReducer,
} from "./people";
import { Events } from "./events";

export interface DomainState {
  people: PeopleState;
}

export const InitialRootState: DomainState = {
  people: InitialPeopleState,
};

export type DomainReducer = (state: DomainState, event: Events) => DomainState;

export const reducer: DomainReducer = combineReducers({
  people: peopleReducer,
});
