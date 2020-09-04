import {
  ID,
  PerformAction,
  buildValidationError,
  generateId,
  buildDomainEvent,
  buildAction,
  ActionPerformerMap,
} from "../framework";
import { selectOrganisation, Name, Organisation } from "./state";

export const ADD_ORGANISATION = "action/ADD_ORGANISATION";
export const ORGANISATION_ADDED = "event/ORGANISATION_ADDED";

export const RENAME_ORGANISATION = "action/RENAME_ORGANISATION";
export const ORGANISATION_RENAMED = "event/ORGANISATION_RENAMED";

export const addOrganisation = (input: { name: Name }) =>
  buildAction(ADD_ORGANISATION, input);
export type AddOrganisationAction = ReturnType<typeof addOrganisation>;

export const buildOrganisationAddedEvent = (organisation: Organisation) =>
  buildDomainEvent(ORGANISATION_ADDED, organisation);
export type OrganisationAddedEvent = ReturnType<
  typeof buildOrganisationAddedEvent
>;

export const performAddOrganisation: PerformAction = (state, action) => {
  const organisation = { ...action.payload, id: generateId() };
  return buildOrganisationAddedEvent(organisation);
};

interface RenameOrganisationInput {
  organisationId: ID;
  name: Name;
}

interface RenameOrganisationPayload {
  organisationId: ID;
  name: Name;
}
export const renameOrganisation = (input: RenameOrganisationInput) =>
  buildAction(RENAME_ORGANISATION, input);
export type RenameOrganisationAction = ReturnType<typeof renameOrganisation>;

export const buildOrganisationRenamedEvent = (
  payload: RenameOrganisationPayload
) => buildDomainEvent(ORGANISATION_RENAMED, payload);
export type OrganisationRenamedEvent = ReturnType<
  typeof buildOrganisationRenamedEvent
>;

export const performRenameOrganisation: PerformAction = (state, action) => {
  const organisation = selectOrganisation(action.payload.organisationId)(state);
  if (organisation) {
    return buildOrganisationRenamedEvent(action.payload);
  } else {
    return buildValidationError("Organisation not found", action);
  }
};

export type OrganisationEvents =
  | OrganisationAddedEvent
  | OrganisationRenamedEvent;

export const actionPerformerMap: ActionPerformerMap = {
  [ADD_ORGANISATION]: performAddOrganisation,
  [RENAME_ORGANISATION]: performRenameOrganisation,
};
