import produce, { Draft } from "immer";
import { ID, get } from "../framework";
import { DomainState } from "../projection";
import {
  IdentityEvents,
  IDENTITY_ADDED,
  IDENTITY_DELETED,
  SECRET_ADDED,
} from "./events";

export interface Identity {
  id: ID;
  personId: ID;
  organisationId: ID;
  name: string;
  value: string;
}

export interface Secret {
  identityId: ID;
  name: string;
  hint: string;
  restrictions: string;
}

export interface IdentitiesState {
  identities: { [id: string]: Identity };
  secrets: { [identityId: string]: readonly Secret[] };
}

export const InitialState: IdentitiesState = {
  identities: {},
  secrets: {},
};

export const selectIdentities = (state: DomainState) =>
  state.identities.identities;

export const selectUniqueIdentityNames = (state: DomainState) =>
  unique(Object.values(selectIdentities(state)).map((_) => _.name));

export const selectUniqueIdentityValuesForPerson = (personId: ID) => (
  state: DomainState
) =>
  unique(
    Object.values(selectIdentitiesFor({ personId })(state)).map((_) => _.value)
  );

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

export const selectSecretsForIdentity = (identityId: ID) => (
  state: DomainState
) => state.identities.secrets[identityId] || [];

export const selectUniqueSecretNames = (state: DomainState) =>
  unique(
    Object.values(state.identities.secrets)
      .flat()
      .map((_) => _.name)
  );

export const reducer = produce(
  (draft: Draft<IdentitiesState>, event: IdentityEvents) => {
    switch (event.type) {
      case IDENTITY_ADDED:
        draft.identities[event.payload.id] = event.payload;
        break;
      case IDENTITY_DELETED:
        delete draft.identities[event.payload.identityId];
        break;
      case SECRET_ADDED:
        addSecret(event.payload, draft);
    }
  },
  InitialState
);

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function addSecret(secret: Secret, draft: Draft<IdentitiesState>): void {
  const secrets = draft.secrets[secret.identityId] || [];
  draft.secrets[secret.identityId] = secrets
    .filter((_) => _.name !== secret.name)
    .concat([secret]);
}
