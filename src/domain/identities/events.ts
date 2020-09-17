import {
  ID,
  PerformAction,
  buildValidationError,
  generateId,
  buildDomainEvent,
  buildAction,
  ActionPerformerMap,
  ValidationError,
} from "../framework";
import { selectIdentity, Identity, Secret } from "./state";
import { selectPerson } from "../people";
import { selectOrganisation } from "../organisations";
import { DomainState } from "../projection";

export const ADD_IDENTITY = "action/ADD_IDENTITY";
export const IDENTITY_ADDED = "event/IDENTITY_ADDED";

export const DELETE_IDENTITY = "action/DELETE_IDENTITY";
export const IDENTITY_DELETED = "event/IDENTITY_DELETED";

export const ADD_SECRET = "action/ADD_SECRET";
export const SECRET_ADDED = "event/SECRET_ADDED";

export type IdentityInput = Omit<Identity, "id">;

export const addIdentity = (input: IdentityInput) =>
  buildAction(ADD_IDENTITY, input);
export type AddIdentityAction = ReturnType<typeof addIdentity>;

export const buildIdentityAddedEvent = (identity: Identity) =>
  buildDomainEvent(IDENTITY_ADDED, identity);
export type IdentityAddedEvent = ReturnType<typeof buildIdentityAddedEvent>;

export const performAddIdentity = (
  state: DomainState,
  action: AddIdentityAction
): IdentityAddedEvent | ValidationError => {
  const input = action.payload;
  if (!selectPerson(input.personId)(state)) {
    return buildValidationError("Person not found", action);
  }
  if (!selectOrganisation(input.organisationId)(state)) {
    return buildValidationError("Organisation not found", action);
  }
  const identity = { ...input, id: generateId() };
  return buildIdentityAddedEvent(identity);
};

interface DeleteIdentityInput {
  identityId: ID;
}

interface DeleteIdentityPayload {
  identityId: ID;
}

export const deleteIdentity = (input: DeleteIdentityInput) =>
  buildAction(DELETE_IDENTITY, input);
export type DeleteIdentityAction = ReturnType<typeof deleteIdentity>;

export const buildIdentityDeletedEvent = (payload: DeleteIdentityPayload) =>
  buildDomainEvent(IDENTITY_DELETED, payload);
export type IdentityDeletedEvent = ReturnType<typeof buildIdentityDeletedEvent>;

export const performDeleteIdentity: PerformAction = (state, action) => {
  const identity = selectIdentity(action.payload.identityId)(state);
  if (identity) {
    return buildIdentityDeletedEvent(action.payload);
  } else {
    return buildValidationError("Identity not found", action);
  }
};

export const addSecret = (input: Secret) => buildAction(ADD_SECRET, input);
export type AddSecretAction = ReturnType<typeof addSecret>;

export const buildSecretAddedEvent = (secret: Secret) =>
  buildDomainEvent(SECRET_ADDED, secret);
export type SecretAddedEvent = ReturnType<typeof buildSecretAddedEvent>;

export const performAddSecret = (
  state: DomainState,
  action: AddSecretAction
): SecretAddedEvent | ValidationError => {
  const secret = action.payload as Secret;
  if (!selectIdentity(secret.identityId)(state)) {
    return buildValidationError("Identity not found", action);
  }
  return buildSecretAddedEvent(secret);
};

export type IdentityEvents =
  | IdentityAddedEvent
  | IdentityDeletedEvent
  | SecretAddedEvent;

export const actionPerformerMap: ActionPerformerMap = {
  [ADD_IDENTITY]: performAddIdentity as PerformAction,
  [DELETE_IDENTITY]: performDeleteIdentity,
  [ADD_SECRET]: performAddSecret as PerformAction,
};
