import React from "react";
import { useSelector } from "react-redux";
import {
  selectOrganisations,
  Organisation as OrganisationData,
} from "../../../domain";
import { AddOrganisation } from "./AddOrganisation";
import { Accordion, AccordionSummary, Card } from "@material-ui/core";

export function Organisations() {
  const organisations = useSelector(selectOrganisations);

  return (
    <Card>
      <AddOrganisation />
      {Object.values(organisations).map((organisation) => (
        <Organisation key={organisation.id} organisation={organisation} />
      ))}
    </Card>
  );
}

export function Organisation({
  organisation,
}: {
  organisation: OrganisationData;
}) {
  return (
    <Accordion>
      <AccordionSummary>{organisation.name}</AccordionSummary>
    </Accordion>
  );
}
