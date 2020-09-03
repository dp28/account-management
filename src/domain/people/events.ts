import {
  ID,
  buildEventBase,
  Action,
  PerformAction,
  DomainEvent,
  buildValidationError,
  generateId,
} from "../framework";
import { selectPerson, Name, Person } from "./state";

export const ADD_PERSON = "action/ADD_PERSON";
export const PERSON_ADDED = "event/PERSON_ADDED";

export const RENAME_PERSON = "action/RENAME_PERSON";
export const PERSON_RENAMED = "event/PERSON_RENAMED";

interface AddPersonInput {
  name: Name;
}

export interface AddPersonAction extends Action<AddPersonInput> {
  type: typeof ADD_PERSON;
}

export interface PersonAddedEvent extends DomainEvent<Person> {
  type: typeof PERSON_ADDED;
}

export function addPerson(input: AddPersonInput): AddPersonAction {
  return {
    type: ADD_PERSON,
    payload: input,
  };
}

export const performAddPerson: PerformAction<
  AddPersonAction,
  PersonAddedEvent
> = (state, action) => {
  const person = { ...action.payload, id: generateId() };
  return { ...buildEventBase(), type: PERSON_ADDED, payload: person };
};

interface RenamePersonInput {
  personId: ID;
  name: Name;
}

interface RenamePersonPayload {
  personId: ID;
  name: Name;
}

export interface RenamePersonAction extends Action<RenamePersonInput> {
  type: typeof RENAME_PERSON;
}

export interface PersonRenamedEvent extends DomainEvent<RenamePersonPayload> {
  type: typeof PERSON_RENAMED;
}

export function renamePerson(input: RenamePersonInput): RenamePersonAction {
  return {
    type: RENAME_PERSON,
    payload: input,
  };
}

export const performRenamePerson: PerformAction<
  RenamePersonAction,
  PersonRenamedEvent
> = (state, action) => {
  const person = selectPerson(action.payload.personId)(state);
  if (person) {
    return {
      ...buildEventBase(),
      type: PERSON_RENAMED,
      payload: action.payload,
    };
  } else {
    return buildValidationError("Person not found", action);
  }
};

export type PeopleEvents = PersonAddedEvent | PersonRenamedEvent;
