import {
  ID,
  PerformAction,
  buildValidationError,
  generateId,
  buildDomainEvent,
  buildAction,
  ActionPerformerMap,
} from "../framework";
import { selectIdentity, Identity } from "./state";

export const ADD_IDENTITY = "action/ADD_IDENTITY";
export const IDENTITY_ADDED = "event/IDENTITY_ADDED";

export const DELETE_IDENTITY = "action/DELETE_IDENTITY";
export const IDENTITY_DELETED = "event/IDENTITY_DELETED";

export type IdentityInput = Omit<Identity, "id">;

export const addIdentity = (input: IdentityInput) =>
  buildAction(ADD_IDENTITY, input);
export type AddIdentityAction = ReturnType<typeof addIdentity>;

export const buildIdentityAddedEvent = (identity: Identity) =>
  buildDomainEvent(IDENTITY_ADDED, identity);
export type IdentityAddedEvent = ReturnType<typeof buildIdentityAddedEvent>;

export const performAddIdentity: PerformAction = (state, action) => {
  const identity = { ...action.payload, id: generateId() };
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

export type IdentityEvents = IdentityAddedEvent | IdentityDeletedEvent;

export const actionPerformerMap: ActionPerformerMap = {
  [ADD_IDENTITY]: performAddIdentity,
  [DELETE_IDENTITY]: performDeleteIdentity,
};
