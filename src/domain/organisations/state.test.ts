import {
  selectOrganisations,
  selectOrganisation,
  reducer,
  InitialState,
  selectOrganisationsArray,
} from "./state";
import { InitialDomainState } from "../projection";
import {
  ORGANISATION_ADDED,
  ORGANISATION_RENAMED,
  buildOrganisationAddedEvent,
  buildOrganisationRenamedEvent,
} from "./events";
import { buildOrganisation } from "./testSupport";

describe("selectOrganisations", () => {
  it("returns the organisations map", () => {
    expect(selectOrganisations(InitialDomainState)).toEqual({});
  });

  describe("if there is a organisation", () => {
    const [organisation, state] = buildOrganisation();

    it("includes the organisation in the returned state", () => {
      expect(selectOrganisations(state)).toEqual({
        [organisation.id]: organisation,
      });
    });
  });
});

describe("selectOrganisationsArray", () => {
  it("returns an array", () => {
    expect(selectOrganisationsArray(InitialDomainState)).toEqual([]);
  });

  describe("if there is a organisation", () => {
    const [organisation, state] = buildOrganisation();

    it("includes the organisation in the returned state", () => {
      expect(selectOrganisationsArray(state)).toEqual([organisation]);
    });
  });
});

describe("selectOrganisation", () => {
  describe("if the organisation does not exist", () => {
    it("returns undefined", () => {
      expect(selectOrganisation("1")(InitialDomainState)).toBeUndefined();
    });
  });

  describe("if the organisation does exist", () => {
    const [organisation, state] = buildOrganisation();

    it("returns the organisation", () => {
      expect(selectOrganisation(organisation.id)(state)).toEqual(organisation);
    });
  });
});

describe("reducer", () => {
  describe(`with a ${ORGANISATION_ADDED} event`, () => {
    const [organisation, organisationAddedState] = buildOrganisation();

    const event = buildOrganisationAddedEvent(organisation);

    describe("when the organisation has not been added before", () => {
      const newState = reducer(InitialState, event);

      it("adds the organisation to the organisations map", () => {
        expect(newState.organisations[organisation.id]).toEqual(organisation);
      });
    });

    describe("when the organisation has been added before", () => {
      const newState = reducer(organisationAddedState.organisations, event);

      it("adds does not re-add the organisation to the organisations map", () => {
        expect(newState.organisations).toEqual({
          [organisation.id]: organisation,
        });
      });
    });
  });

  describe(`with a ${ORGANISATION_RENAMED} event`, () => {
    const [organisation, organisationAddedState] = buildOrganisation();
    const newName = "New Acme";

    const event = buildOrganisationRenamedEvent({
      organisationId: organisation.id,
      name: newName,
    });

    describe("when the organisation has been added before", () => {
      const newState = reducer(organisationAddedState.organisations, event);

      it("changes the organisation's name to the name in the payload of the event", () => {
        expect(newState.organisations[organisation.id].name).toEqual(newName);
      });
    });
  });
});
