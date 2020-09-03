import React from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectPeople, Person as PersonData, addPerson } from "../../../domain";

export function People() {
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>People</h2>
      <Button
        onClick={() =>
          dispatch(
            addPerson({ name: { firstName: "Anne", lastName: "Example" } })
          )
        }
      >
        Add Person
      </Button>
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
