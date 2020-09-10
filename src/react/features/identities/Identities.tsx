import React from "react";
import { Identity as IdentityData, selectIdentitiesFor } from "../../../domain";
import { AddIdentity } from "./AddIdentity";
import {
  Accordion,
  AccordionSummary,
  Card,
  Typography,
} from "@material-ui/core";
import { ID } from "../../../domain/framework";
import { useSelector } from "react-redux";

type Props = {
  organisationId?: ID;
  personId?: ID;
};

export function Identities({ organisationId, personId }: Props) {
  const identities = useSelector(
    selectIdentitiesFor({ organisationId, personId })
  );

  return (
    <Card>
      <div>
        <Typography variant="h5">Identities</Typography>
      </div>
      <AddIdentity organisationId={organisationId} personId={personId} />
      {Object.values(identities).map((identity) => (
        <Identity key={identity.id} identity={identity} />
      ))}
    </Card>
  );
}

export function Identity({ identity }: { identity: IdentityData }) {
  return (
    <Accordion>
      <AccordionSummary>{identity.value}</AccordionSummary>
    </Accordion>
  );
}
