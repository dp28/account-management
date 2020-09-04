import { combineReducers } from "redux";
import {
  PeopleState,
  InitialState as InitialPeopleState,
  reducer as peopleReducer,
} from "./people";
import {
  OrganisationsState,
  InitialState as InitialOrganisationsState,
  reducer as organisationsReducer,
} from "./organisations";
import { Events } from "./events";

export interface DomainState {
  people: PeopleState;
  organisations: OrganisationsState;
}

export const InitialDomainState: DomainState = {
  people: InitialPeopleState,
  organisations: InitialOrganisationsState,
};

export type DomainReducer = (
  state: DomainState | undefined,
  event: Events
) => DomainState;

export const reducer: DomainReducer = combineReducers({
  people: peopleReducer,
  organisations: organisationsReducer,
});
