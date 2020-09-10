import { produce } from "immer";
import { DomainState, InitialDomainState } from "../projection";
import { Identity } from "./state";
import { buildPerson } from "../people/testSupport";
import { buildOrganisation } from "../organisations/testSupport";

const DefaultIdentityProps = {
  id: "1",
  name: "Username",
  value: "admin",
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
    personId: person.id,
    organisationId: organisation.id,
    ...properties,
  };
  const newState = produce(organisationAddedState, (draft) => {
    draft.identities.identities[identity.id] = identity;
  });
  return [identity, newState];
}
