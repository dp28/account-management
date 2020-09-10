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
import {
  IdentitiesState,
  InitialState as InitialIdentitiesState,
  reducer as identitiesReducer,
} from "./identities";

export interface DomainState {
  people: PeopleState;
  organisations: OrganisationsState;
  identities: IdentitiesState;
}

export const InitialDomainState: DomainState = {
  people: InitialPeopleState,
  organisations: InitialOrganisationsState,
  identities: InitialIdentitiesState,
};

export type DomainReducer = (
  state: DomainState | undefined,
  event: Events
) => DomainState;

export const reducer: DomainReducer = combineReducers({
  people: peopleReducer,
  organisations: organisationsReducer,
  identities: identitiesReducer,
});
