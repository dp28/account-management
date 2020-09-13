import { produce } from "immer";
import { Organisation } from "./state";
import { InitialDomainState, DomainState } from "../projection";
import { generateId } from "../framework";

export function buildOrganisation(
  state = InitialDomainState,
  { id = generateId(), name = "Acme, Ince" } = {}
): [Organisation, DomainState] {
  const organisation = { id, name };
  const newState = produce(state, (draft) => {
    draft.organisations.organisations[id] = organisation;
  });
  return [organisation, newState];
}
