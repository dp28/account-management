import {
  addIdentity,
  performAddIdentity,
  IdentityAddedEvent,
  deleteIdentity,
  performDeleteIdentity,
  IdentityDeletedEvent,
  IdentityInput,
  addSecret,
  performAddSecret,
  SecretAddedEvent,
} from "./events";
import { InitialDomainState } from "../projection";
import { VALIDATION_ERROR } from "../framework";
import { buildIdentity } from "./testSupport";
import { Secret } from "./state";

describe("performAddIdentity", () => {
  const [otherIdentity, state] = buildIdentity();
  const action = addIdentity({
    personId: otherIdentity.personId,
    organisationId: otherIdentity.organisationId,
    name: "Email",
    value: "me@example.com",
  });
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

  describe("if the person does not exist", () => {
    it("returns a validation error", () => {
      expect(performAddIdentity(InitialDomainState, action).type).toEqual(
        VALIDATION_ERROR
      );
    });
  });

  describe("if the organisation does not exist", () => {
    it("returns a validation error", () => {
      expect(performAddIdentity(InitialDomainState, action).type).toEqual(
        VALIDATION_ERROR
      );
    });
  });
});

describe("performDeleteIdentity", () => {
  const [identity, state] = buildIdentity();
  const action = deleteIdentity({ identityId: identity.id });

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

describe("performAddSecret", () => {
  const [identity, state] = buildIdentity();

  const secret: Secret = {
    identityId: identity.id,
    name: "Password",
    hint: "pretty easy",
    restrictions: "None",
  };
  const action = addSecret(secret);
  const event = performAddSecret(state, action) as SecretAddedEvent;

  const propertyNames: Array<keyof Secret> = [
    "identityId",
    "name",
    "restrictions",
  ];
  propertyNames.forEach((propertyName) => {
    it(`creates a secret with the passed-in ${propertyName}`, () => {
      expect(event.payload[propertyName]).toEqual(action.payload[propertyName]);
    });
  });

  describe("if the identity does not exist", () => {
    it("returns a validation error", () => {
      expect(performAddSecret(InitialDomainState, action).type).toEqual(
        VALIDATION_ERROR
      );
    });
  });
});
