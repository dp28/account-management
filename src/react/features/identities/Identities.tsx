import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  Card,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Identity as IdentityData, selectIdentitiesFor } from "../../../domain";
import { ID } from "../../../domain/framework";
import { AddIdentity } from "./AddIdentity";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontStyle: "italic",
      color: theme.palette.grey[500],
      marginRight: theme.spacing(1),
    },
  })
);

function Identity({ identity }: { identity: IdentityData }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary>
        <span className={classes.name}>{identity.name}:</span> {identity.value}
      </AccordionSummary>
    </Accordion>
  );
}
