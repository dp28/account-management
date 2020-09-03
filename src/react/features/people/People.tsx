import React from "react";
import { useSelector } from "react-redux";
import { selectPeople, Person as PersonData } from "../../../domain";
import { AddPerson } from "./AddPerson";

export function People() {
  const people = useSelector(selectPeople);

  return (
    <div>
      <h2>People</h2>
      <AddPerson />
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
