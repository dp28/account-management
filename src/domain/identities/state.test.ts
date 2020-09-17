import {
  selectIdentities,
  selectIdentity,
  reducer,
  InitialState,
  selectIdentitiesFor,
  selectUniqueIdentityNames,
  selectUniqueIdentityValuesForPerson,
  selectSecretsForIdentity,
  selectUniqueSecretNames,
} from "./state";
import { InitialDomainState } from "../projection";
import {
  IDENTITY_ADDED,
  IDENTITY_DELETED,
  buildIdentityAddedEvent,
  buildIdentityDeletedEvent,
  SECRET_ADDED,
  buildSecretAddedEvent,
} from "./events";
import { buildIdentity, buildSecret } from "./testSupport";

describe("selectIdentities", () => {
  it("returns the identities map", () => {
    expect(selectIdentities(InitialDomainState)).toEqual({});
  });

  describe("if there is an identity", () => {
    const [identity, state] = buildIdentity();

    it("includes the identity in the returned state", () => {
      expect(selectIdentities(state)).toEqual({
        [identity.id]: identity,
      });
    });
  });
});

describe("selectUniqueIdentityNames", () => {
  it("returns an array", () => {
    expect(selectUniqueIdentityNames(InitialDomainState)).toEqual([]);
  });

  describe("if there is an identity", () => {
    const [identity, state] = buildIdentity();

    it("includes the name of the identity in the returned state", () => {
      expect(selectUniqueIdentityNames(state)).toEqual([identity.name]);
    });
  });

  describe("if there are multiple identities with the same name", () => {
    const result = buildIdentity({
      properties: { name: "Username" },
    });
    const secondResult = buildIdentity({
      state: result[1],
      properties: { name: "Username" },
    });

    it("includes the name only once", () => {
      expect(selectUniqueIdentityNames(secondResult[1])).toEqual(["Username"]);
    });
  });

  describe("if there are multiple identities with different names", () => {
    const result = buildIdentity({
      properties: { name: "Username" },
    });
    const secondResult = buildIdentity({
      state: result[1],
      properties: { name: "User ID" },
    });

    it("includes one copy of each unique name", () => {
      expect(selectUniqueIdentityNames(secondResult[1])).toEqual([
        "Username",
        "User ID",
      ]);
    });
  });
});

describe("selectUniqueIdentityValuesForPerson", () => {
  const personId = "1";

  it("returns an array", () => {
    expect(
      selectUniqueIdentityValuesForPerson(personId)(InitialDomainState)
    ).toEqual([]);
  });

  describe("if there is an identity", () => {
    const [identity, state] = buildIdentity({ properties: { personId } });

    it("includes the value of the identity in the returned state", () => {
      expect(selectUniqueIdentityValuesForPerson(personId)(state)).toEqual([
        identity.value,
      ]);
    });
  });

  describe("if there are multiple identities with the same value", () => {
    const result = buildIdentity({
      properties: { value: "example", personId },
    });
    const secondResult = buildIdentity({
      state: result[1],
      properties: { value: "example", personId },
    });

    it("includes the value only once", () => {
      expect(
        selectUniqueIdentityValuesForPerson(personId)(secondResult[1])
      ).toEqual(["example"]);
    });
  });

  describe("if there are multiple identities with different values", () => {
    const result = buildIdentity({
      properties: { value: "example", personId },
    });
    const secondResult = buildIdentity({
      state: result[1],
      properties: { value: "example@example.com", personId },
    });

    it("includes one copy of each unique value", () => {
      expect(
        selectUniqueIdentityValuesForPerson(personId)(secondResult[1])
      ).toEqual(["example", "example@example.com"]);
    });
  });
});

describe("selectIdentity", () => {
  describe("if the identity does not exist", () => {
    it("returns undefined", () => {
      expect(selectIdentity("1")(InitialDomainState)).toBeUndefined();
    });
  });

  describe("if the identity does exist", () => {
    const [identity, state] = buildIdentity();

    it("returns the identity", () => {
      expect(selectIdentity(identity.id)(state)).toEqual(identity);
    });
  });
});

describe("selectIdentitiesFor", () => {
  it("returns an array", () => {
    expect(selectIdentitiesFor({})(InitialDomainState)).toEqual([]);
  });

  describe("if there is an identity", () => {
    const [identity, partialState] = buildIdentity({ properties: { id: "1" } });
    const [otherIdentity, state] = buildIdentity({
      state: partialState,
      properties: {
        id: "2",
        personId: identity.personId + "otther",
        organisationId: identity.organisationId + "other",
      },
    });

    it("includes all the identities in the state if an empty query is passed", () => {
      expect(selectIdentitiesFor({})(state)).toEqual([identity, otherIdentity]);
    });

    it("includes all the identities for the person if a personId is passed", () => {
      expect(
        selectIdentitiesFor({ personId: identity.personId })(state)
      ).toEqual([identity]);
    });

    it("includes all the identities for the organisation if an organisationId is passed", () => {
      expect(
        selectIdentitiesFor({ organisationId: identity.organisationId })(state)
      ).toEqual([identity]);
    });
  });
});

describe("selectSecretsForIdentity", () => {
  it("returns an array", () => {
    expect(selectSecretsForIdentity("id")(InitialDomainState)).toEqual([]);
  });

  describe("if there is an identity with that id which has a secret", () => {
    const [secret, state] = buildSecret();

    it("includes the secret in the returned state", () => {
      expect(selectSecretsForIdentity(secret.identityId)(state)).toEqual([
        secret,
      ]);
    });
  });
});

describe("selectUniqueSecretNames", () => {
  it("returns an array", () => {
    expect(selectUniqueSecretNames(InitialDomainState)).toEqual([]);
  });

  describe("if there is a secret", () => {
    const [secret, state] = buildSecret();

    it("includes the name of the secret in the returned state", () => {
      expect(selectUniqueSecretNames(state)).toEqual([secret.name]);
    });
  });

  describe("if there are multiple secrets with the same name", () => {
    const result = buildSecret({
      properties: { name: "Password" },
    });
    const secondResult = buildSecret({
      state: result[1],
      properties: { name: "Password" },
    });

    it("includes the name only once", () => {
      expect(selectUniqueSecretNames(secondResult[1])).toEqual(["Password"]);
    });
  });

  describe("if there are multiple secrets with different names", () => {
    const result = buildSecret({
      properties: { name: "Password" },
    });
    const secondResult = buildSecret({
      state: result[1],
      properties: { name: "Memorable Information" },
    });

    it("includes one copy of each unique name", () => {
      expect(selectUniqueSecretNames(secondResult[1])).toEqual([
        "Password",
        "Memorable Information",
      ]);
    });
  });
});

describe("reducer", () => {
  describe(`with a ${IDENTITY_ADDED} event`, () => {
    const [identity, identityAddedState] = buildIdentity();

    const event = buildIdentityAddedEvent(identity);

    describe("when the identity has not been added before", () => {
      const newState = reducer(InitialState, event);

      it("adds the identity to the identities map", () => {
        expect(newState.identities[identity.id]).toEqual(identity);
      });
    });

    describe("when the identity has been added before", () => {
      const newState = reducer(identityAddedState.identities, event);

      it("does not re-add the identity to the identities map", () => {
        expect(newState.identities).toEqual({
          [identity.id]: identity,
        });
      });
    });
  });

  describe(`with a ${IDENTITY_DELETED} event`, () => {
    const [identity, identityAddedState] = buildIdentity();

    const event = buildIdentityDeletedEvent({
      identityId: identity.id,
    });

    describe("when the identity has been added before", () => {
      const newState = reducer(identityAddedState.identities, event);

      it("removes the identity from the state", () => {
        expect(newState.identities[identity.id]).toBeUndefined();
      });
    });
  });

  describe(`with a ${SECRET_ADDED} event`, () => {
    const [secret, secretAddedState] = buildSecret({
      properties: { name: "Password", hint: "eeeasy" },
    });

    const event = buildSecretAddedEvent(secret);

    describe("when no secret has been added for the identity before", () => {
      const newState = reducer(InitialState, event);

      it("adds the secret in a new array to the secrets map", () => {
        expect(newState.secrets[secret.identityId]).toEqual([secret]);
      });
    });

    describe("when a secret with a different name has been added for the identity before", () => {
      const newSecret = { ...secret, name: "Other Password" };
      const newEvent = buildSecretAddedEvent(newSecret);
      const newState = reducer(secretAddedState.identities, newEvent);

      it("adds the secret to the identity's array", () => {
        expect(newState.secrets).toEqual({
          [secret.identityId]: [secret, newSecret],
        });
      });
    });

    describe("when a secret with the same name has been added for the identity before", () => {
      const newSecret = { ...secret, hint: "really hard" };
      const newEvent = buildSecretAddedEvent(newSecret);
      const newState = reducer(secretAddedState.identities, newEvent);

      it("overwrites the existing secret", () => {
        expect(newState.secrets).toEqual({
          [secret.identityId]: [newSecret],
        });
      });
    });
  });
});
