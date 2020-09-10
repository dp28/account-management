import produce, { Draft } from "immer";
import { ID, get } from "../framework";
import { DomainState } from "../projection";
import {
  OrganisationEvents,
  ORGANISATION_ADDED,
  ORGANISATION_RENAMED,
} from "./events";

export interface Organisation {
  id: ID;
  name: string;
}

export interface OrganisationsState {
  organisations: { [id: string]: Organisation };
}

export const InitialState: OrganisationsState = {
  organisations: {},
};

export const selectOrganisations = (state: DomainState) =>
  state.organisations.organisations;

export const selectOrganisationsArray = (state: DomainState) =>
  Object.values(selectOrganisations(state));

export const selectOrganisation = (organisationId: ID) => (
  state: DomainState
) => get(organisationId, selectOrganisations(state));

export const reducer = produce(
  (draft: Draft<OrganisationsState>, event: OrganisationEvents) => {
    switch (event.type) {
      case ORGANISATION_ADDED:
        draft.organisations[event.payload.id] = event.payload;
        break;
      case ORGANISATION_RENAMED:
        draft.organisations[event.payload.organisationId].name =
          event.payload.name;
        break;
    }
  },
  InitialState
);
