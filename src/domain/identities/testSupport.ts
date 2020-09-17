import { produce } from "immer";
import { DomainState, InitialDomainState } from "../projection";
import { Identity, Secret } from "./state";
import { buildPerson } from "../people/testSupport";
import { buildOrganisation } from "../organisations/testSupport";
import { generateId } from "../framework";

const DefaultIdentityProps = {
  name: "Username",
  value: "admin",
};

const DefaultSecretProps = {
  name: "Password",
  hint: "pretty easy",
  restrictions: "at least on character",
};

export function buildIdentity({
  state = InitialDomainState,
  properties = DefaultIdentityProps as Partial<Identity>,
} = {}): [Identity, DomainState] {
  const [person, personAddedState] = buildPerson({ state });
  const [organisation, organisationAddedState] = buildOrganisation(
    personAddedState
  );
  const identity: Identity = {
    ...DefaultIdentityProps,
    id: generateId(),
    personId: person.id,
    organisationId: organisation.id,
    ...properties,
  };
  const newState = produce(organisationAddedState, (draft) => {
    draft.identities.identities[identity.id] = identity;
  });
  return [identity, newState];
}

export function buildSecret({
  state = InitialDomainState,
  properties = DefaultSecretProps as Partial<Secret>,
} = {}): [Secret, DomainState] {
  const [identity, identityAddedState] = buildIdentity({ state });

  const secret: Secret = {
    ...DefaultSecretProps,
    identityId: identity.id,
    ...properties,
  };
  const newState = produce(identityAddedState, (draft) => {
    if (!draft.identities.secrets[secret.identityId]) {
      draft.identities.secrets[secret.identityId] = [];
    }
    draft.identities.secrets[secret.identityId].push(secret);
  });
  return [secret, newState];
}
