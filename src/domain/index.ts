export { addPerson, renamePerson, selectPerson, selectPeople } from "./people";
export * from "./projection";
export { performAction } from "./actions";
export { isDomainEvent, isAction } from "./framework";

export type { Person } from "./people";
export type { DomainEvent, Action } from "./framework";
