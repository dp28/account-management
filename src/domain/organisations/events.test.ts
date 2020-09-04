import {
  addOrganisation,
  performAddOrganisation,
  OrganisationAddedEvent,
  renameOrganisation,
  performRenameOrganisation,
  OrganisationRenamedEvent,
} from "./events";
import { DomainState, InitialDomainState } from "../projection";
import { Organisation } from "./state";
import { VALIDATION_ERROR } from "../framework";

describe("performAddOrganisation", () => {
  const action = addOrganisation({ name: "Acme, inc." });
  const state = InitialDomainState;
  const event = performAddOrganisation(state, action) as OrganisationAddedEvent;

  it("creates a organisation with the passed-in name", () => {
    expect(event.payload.name).toEqual(action.payload.name);
  });

  it("generates a unique id for the organisation", () => {
    const repeatEvent = performAddOrganisation(
      state,
      action
    ) as OrganisationAddedEvent;
    expect(event.payload.id).not.toEqual(repeatEvent.payload.id);
  });
});

describe("performRenameOrganisation", () => {
  const organisation: Organisation = { id: "1", name: "Acme, inc" };
  const action = renameOrganisation({
    organisationId: organisation.id,
    name: "New acme",
  });
  const state: DomainState = {
    ...InitialDomainState,
    organisations: { organisations: { [organisation.id]: organisation } },
  };

  it("creates an event with the passed-in name and id", () => {
    const event = performRenameOrganisation(
      state,
      action
    ) as OrganisationRenamedEvent;
    expect(event.payload).toEqual(action.payload);
  });

  describe("if the organisation does not exist", () => {
    it("returns a validation error", () => {
      expect(
        performRenameOrganisation(InitialDomainState, action).type
      ).toEqual(VALIDATION_ERROR);
    });
  });
});
