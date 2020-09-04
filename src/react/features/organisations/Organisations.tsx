import React from "react";
import { useSelector } from "react-redux";
import {
  selectOrganisations,
  Organisation as OrganisationData,
} from "../../../domain";
import { AddOrganisation } from "./AddOrganisation";

export function Organisations() {
  const organisations = useSelector(selectOrganisations);

  return (
    <div>
      <ul>
        {Object.values(organisations).map((organisation) => (
          <li key={organisation.id}>
            <Organisation organisation={organisation} />
          </li>
        ))}
      </ul>
      <AddOrganisation />
    </div>
  );
}

export function Organisation({
  organisation,
}: {
  organisation: OrganisationData;
}) {
  return <div>{organisation.name}</div>;
}
