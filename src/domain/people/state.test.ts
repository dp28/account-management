import {
  selectPeople,
  selectPerson,
  reducer,
  InitialState,
  selectPeopleArray,
} from "./state";
import { InitialDomainState } from "../projection";
import {
  PERSON_ADDED,
  PERSON_RENAMED,
  buildPersonAddedEvent,
  buildPersonRenamedEvent,
} from "./events";
import { buildPerson } from "./testSupport";

describe("selectPeople", () => {
  it("returns the people map", () => {
    expect(selectPeople(InitialDomainState)).toEqual({});
  });

  describe("if there is a person", () => {
    const [person, state] = buildPerson();

    it("includes the person in the returned state", () => {
      expect(selectPeople(state)).toEqual({ [person.id]: person });
    });
  });
});

describe("selectPeopleArray", () => {
  it("returns an array", () => {
    expect(selectPeopleArray(InitialDomainState)).toEqual([]);
  });

  describe("if there is a person", () => {
    const [person, state] = buildPerson();

    it("includes the person in the returned state", () => {
      expect(selectPeopleArray(state)).toEqual([person]);
    });
  });
});

describe("selectPerson", () => {
  describe("if the person does not exist", () => {
    it("returns undefined", () => {
      expect(selectPerson("1")(InitialDomainState)).toBeUndefined();
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

    const event = buildPersonAddedEvent(person);

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

    const event = buildPersonRenamedEvent({
      personId: person.id,
      name: newName,
    });

    describe("when the person has been added before", () => {
      const newState = reducer(personAddedState.people, event);

      it("changes the person's name to the name in the payload of the event", () => {
        expect(newState.people[person.id].name).toEqual(newName);
      });
    });
  });
});
