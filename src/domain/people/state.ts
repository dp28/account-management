import produce, { Draft } from "immer";
import { ID, get } from "../framework";
import { RootState } from "../projection";
import { PeopleEvents, PERSON_ADDED, PERSON_RENAMED } from "./events";

export interface Name {
  firstName: string;
  lastName: string;
}

export interface Person {
  id: ID;
  name: Name;
}

export interface PeopleState {
  people: { [id: string]: Person };
}

export const InitialState: PeopleState = {
  people: {},
};

export const selectPeople = (state: RootState) => state.people.people;

export const selectPerson = (personId: ID) => (state: RootState) =>
  get(personId, selectPeople(state));

export const reducer = produce(
  (draft: Draft<PeopleState>, event: PeopleEvents) => {
    switch (event.type) {
      case PERSON_ADDED:
        draft.people[event.payload.id] = event.payload;
        break;
      case PERSON_RENAMED:
        draft.people[event.payload.personId].name = event.payload.name;
        break;
    }
  },
  InitialState
);
