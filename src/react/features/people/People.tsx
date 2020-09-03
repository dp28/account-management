import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPeople, Person as PersonData, addPerson } from "../../../domain";

export function People() {
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>People</h2>
      <button
        onClick={() =>
          dispatch(
            addPerson({ name: { firstName: "Anne", lastName: "Example" } })
          )
        }
      >
        Add Person
      </button>
      <ul>
        {Object.values(people).map((person) => (
          <li key={person.id}>
            <Person person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Person({ person }: { person: PersonData }) {
  return (
    <div>
      {person.name.firstName} {person.name.lastName}
    </div>
  );
}
