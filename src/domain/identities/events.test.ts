import {
  addIdentity,
  performAddIdentity,
  IdentityAddedEvent,
  deleteIdentity,
  performDeleteIdentity,
  IdentityDeletedEvent,
  IdentityInput,
} from "./events";
import { DomainState, InitialDomainState } from "../projection";
import { Identity } from "./state";
import { VALIDATION_ERROR, Action, DomainEvent } from "../framework";

const identityInput = {
  personId: "1",
  organisationId: "2",
  name: "Username",
  value: "example",
};

describe("performAddIdentity", () => {
  const action = addIdentity(identityInput);
  const state = InitialDomainState;
  const event = performAddIdentity(state, action) as IdentityAddedEvent;

  const propertyNames: Array<keyof IdentityInput> = [
    "personId",
    "organisationId",
    "name",
    "value",
  ];
  propertyNames.forEach((propertyName) => {
    it(`creates a identity with the passed-in ${propertyName}`, () => {
      expect(event.payload[propertyName]).toEqual(action.payload[propertyName]);
    });
  });

  it("generates a unique id for the identity", () => {
    const repeatEvent = performAddIdentity(state, action) as IdentityAddedEvent;
    expect(event.payload.id).not.toEqual(repeatEvent.payload.id);
  });
});

describe("performDeleteIdentity", () => {
  const identity: Identity = { id: "1", ...identityInput };
  const action = deleteIdentity({ identityId: identity.id });
  const state: DomainState = {
    ...InitialDomainState,
    identities: { identities: { [identity.id]: identity } },
  };

  it("creates an event with the passed-in identityId", () => {
    const event = performDeleteIdentity(state, action) as IdentityDeletedEvent;
    expect(event.payload).toEqual(action.payload);
  });

  describe("if the identity does not exist", () => {
    it("returns a validation error", () => {
      expect(performDeleteIdentity(InitialDomainState, action).type).toEqual(
        VALIDATION_ERROR
      );
    });
  });
});
