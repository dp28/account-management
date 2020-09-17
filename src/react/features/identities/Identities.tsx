import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@material-ui/core";
import { selectIdentitiesFor, ID } from "../../../domain";
import { AddIdentity } from "./AddIdentity";
import { Identity } from "./Identity";

type Props = {
  organisationId: ID;
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
      <AddIdentity organisationId={organisationId} />
      {Object.values(identities).map((identity) => (
        <Identity key={identity.id} identity={identity} />
      ))}
    </Card>
  );
}
