export { addPerson, renamePerson, selectPerson, selectPeople } from "./people";
export {
  addOrganisation,
  renameOrganisation,
  selectOrganisation,
  selectOrganisations,
} from "./organisations";
export * from "./projection";
export { performAction } from "./actions";
export { isDomainEvent, isAction } from "./framework";

export type { Person } from "./people";
export type { Organisation } from "./organisations";
export type { DomainEvent, Action } from "./framework";
