import { produce } from "immer";
import {
  selectPeople,
  Person,
  selectPerson,
  reducer,
  InitialState,
} from "./state";
import { InitialRootState, RootState } from "../state";
import {
  PERSON_ADDED,
  PersonAddedEvent,
  PERSON_RENAMED,
  PersonRenamedEvent,
} from "./events";
import { buildEventBase } from "../framework";

function buildPerson(
  { id = "1", name = { firstName: "a", lastName: "b" } } = {},
  state = InitialRootState
): [Person, RootState] {
  const person = { id, name };
  const newState = produce(state, (draft) => {
    draft.people.people[id] = person;
  });
  return [person, newState];
}

describe("selectPeople", () => {
  it("returns the people map", () => {
    expect(selectPeople(InitialRootState)).toEqual({});
  });

  describe("if there is a person", () => {
    const [person, state] = buildPerson();

    it("includes the person in the returned state", () => {
      expect(selectPeople(state)).toEqual({ [person.id]: person });
    });
  });
});

describe("selectPerson", () => {
  describe("if the person does not exist", () => {
    it("returns undefined", () => {
      expect(selectPerson("1")(InitialRootState)).toBeUndefined();
    });
  });

  describe("if the person does exist", () => {
    const [person, state] = buildPerson();

    it("returns the person", () => {
      expect(selectPerson(person.id)(state)).toEqual(person);
    });
  });
});

describe("reducer", () => {
  describe(`with a ${PERSON_ADDED} event`, () => {
    const [person, personAddedState] = buildPerson();

    const event: PersonAddedEvent = {
      ...buildEventBase(),
      type: PERSON_ADDED,
      payload: person,
    };

    describe("when the person has not been added before", () => {
      const newState = reducer(InitialState, event);

      it("adds the person to the people map", () => {
        expect(newState.people[person.id]).toEqual(person);
      });
    });

    describe("when the person has been added before", () => {
      const newState = reducer(personAddedState.people, event);

      it("adds does not re-add the person to the people map", () => {
        expect(newState.people).toEqual({ [person.id]: person });
      });
    });
  });

  describe(`with a ${PERSON_RENAMED} event`, () => {
    const [person, personAddedState] = buildPerson();
    const newName = { firstName: "Jean", lastName: "Smith" };

    const event: PersonRenamedEvent = {
      ...buildEventBase(),
      type: PERSON_RENAMED,
      payload: { personId: person.id, name: newName },
    };

    describe("when the person has been added before", () => {
      const newState = reducer(personAddedState.people, event);

      it("changes the person's name to the name in the payload of the event", () => {
        expect(newState.people[person.id].name).toEqual(newName);
      });
    });
  });
});
