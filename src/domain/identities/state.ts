import produce, { Draft } from "immer";
import { ID, get } from "../framework";
import { DomainState } from "../projection";
import { IdentityEvents, IDENTITY_ADDED, IDENTITY_DELETED } from "./events";

export interface Identity {
  id: ID;
  personId: ID;
  organisationId: ID;
  name: string;
  value: string;
}

export interface IdentitiesState {
  identities: { [id: string]: Identity };
}

export const InitialState: IdentitiesState = {
  identities: {},
};

export const selectIdentities = (state: DomainState) =>
  state.identities.identities;

export const selectIdentitiesFor = ({
  personId,
  organisationId,
}: {
  personId?: ID;
  organisationId?: ID;
}) => (state: DomainState) =>
  Object.values(selectIdentities(state)).filter(
    (identity) =>
      (!personId || identity.personId === personId) &&
      (!organisationId || identity.organisationId === organisationId)
  );

export const selectIdentity = (identityId: ID) => (state: DomainState) =>
  get(identityId, selectIdentities(state));

export const reducer = produce(
  (draft: Draft<IdentitiesState>, event: IdentityEvents) => {
    switch (event.type) {
      case IDENTITY_ADDED:
        draft.identities[event.payload.id] = event.payload;
        break;
      case IDENTITY_DELETED:
        delete draft.identities[event.payload.identityId];
        break;
    }
  },
  InitialState
);
