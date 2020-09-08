import React from "react";
import { useSelector } from "react-redux";
import { selectPeople, Person as PersonData } from "../../../domain";
import { AddPerson } from "./AddPerson";
import { Accordion, Card, AccordionSummary } from "@material-ui/core";

export function People() {
  const people = useSelector(selectPeople);

  return (
    <Card>
      <AddPerson />
      {Object.values(people).map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </Card>
  );
}

export function Person({ person }: { person: PersonData }) {
  return (
    <Accordion>
      <AccordionSummary>
        {person.name.firstName} {person.name.lastName}
      </AccordionSummary>
    </Accordion>
  );
}
