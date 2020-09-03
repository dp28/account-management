import {
  ID,
  PerformAction,
  buildValidationError,
  generateId,
  buildDomainEvent,
  buildAction,
} from "../framework";
import { selectPerson, Name, Person } from "./state";

export const ADD_PERSON = "action/ADD_PERSON";
export const PERSON_ADDED = "event/PERSON_ADDED";

export const RENAME_PERSON = "action/RENAME_PERSON";
export const PERSON_RENAMED = "event/PERSON_RENAMED";

export const addPerson = (input: { name: Name }) =>
  buildAction(ADD_PERSON, input);
export type AddPersonAction = ReturnType<typeof addPerson>;

export const buildPersonAddedEvent = (person: Person) =>
  buildDomainEvent(PERSON_ADDED, person);
export type PersonAddedEvent = ReturnType<typeof buildPersonAddedEvent>;

export const performAddPerson: PerformAction = (state, action) => {
  const person = { ...action.payload, id: generateId() };
  return buildPersonAddedEvent(person);
};

interface RenamePersonInput {
  personId: ID;
  name: Name;
}

interface RenamePersonPayload {
  personId: ID;
  name: Name;
}
export const renamePerson = (input: RenamePersonInput) =>
  buildAction(RENAME_PERSON, input);
export type RenamePersonAction = ReturnType<typeof renamePerson>;

export const buildPersonRenamedEvent = (payload: RenamePersonPayload) =>
  buildDomainEvent(PERSON_RENAMED, payload);
export type PersonRenamedEvent = ReturnType<typeof buildPersonRenamedEvent>;

export const performRenamePerson: PerformAction = (state, action) => {
  const person = selectPerson(action.payload.personId)(state);
  if (person) {
    return buildPersonRenamedEvent(action.payload);
  } else {
    return buildValidationError("Person not found", action);
  }
};

export type PeopleEvents = PersonAddedEvent | PersonRenamedEvent;
