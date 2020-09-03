import {
  addPerson,
  performAddPerson,
  PersonAddedEvent,
  renamePerson,
  performRenamePerson,
  PersonRenamedEvent,
} from "./events";
import { RootState, InitialRootState } from "../projection";
import { Person } from "./state";
import { VALIDATION_ERROR } from "../framework";

describe("performAddPerson", () => {
  const action = addPerson({ name: { firstName: "John", lastName: "Smith" } });
  const state = InitialRootState;
  const event = performAddPerson(state, action) as PersonAddedEvent;

  it("creates a person with the passed-in name", () => {
    expect(event.payload.name).toEqual(action.payload.name);
  });

  it("generates a unique id for the person", () => {
    const repeatEvent = performAddPerson(state, action) as PersonAddedEvent;
    expect(event.payload.id).not.toEqual(repeatEvent.payload.id);
  });
});

describe("performRenamePerson", () => {
  const person: Person = { id: "1", name: { firstName: "J", lastName: "S" } };
  const action = renamePerson({
    personId: person.id,
    name: { firstName: "John", lastName: "Smith" },
  });
  const state: RootState = {
    ...InitialRootState,
    people: { people: { [person.id]: person } },
  };

  it("creates an event with the passed-in name and id", () => {
    const event = performRenamePerson(state, action) as PersonRenamedEvent;
    expect(event.payload).toEqual(action.payload);
  });

  describe("if the person does not exist", () => {
    it("returns a validation error", () => {
      expect(performRenamePerson(InitialRootState, action).type).toEqual(
        VALIDATION_ERROR
      );
    });
  });
});
