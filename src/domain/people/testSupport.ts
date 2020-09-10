import { produce } from "immer";
import { Person } from "./state";
import { InitialDomainState, DomainState } from "../projection";
import { generateId } from "../framework";

const DefaultProperties: Partial<Person> = {};

export function buildPerson({
  state = InitialDomainState,
  properties = DefaultProperties,
  dependencies = [],
} = {}): [Person, DomainState] {
  const person = buildMockPerson(properties);
  const newState = produce(state, (draft) => {
    draft.people.people[person.id] = person;
  });
  return [person, newState];
}

function buildMockPerson(overrides: Partial<Person>): Person {
  return {
    id: generateId(),
    name: { firstName: "Joe", lastName: "Smith" },
    ...overrides,
  };
}
