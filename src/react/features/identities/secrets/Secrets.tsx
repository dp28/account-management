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
  AccordionDetails,
} from "@material-ui/core";
import {
  Secret as SecretData,
  ID,
  selectSecretsForIdentity,
} from "../../../../domain";
import { AddSecret } from "./AddSecret";

type Props = {
  identityId: ID;
  personId: ID;
};

export function Secrets({ identityId, personId }: Props) {
  const secrets = useSelector(selectSecretsForIdentity(identityId));

  return (
    <Card>
      <div>
        <Typography variant="h5">Secrets</Typography>
      </div>
      <AddSecret identityId={identityId} personId={personId} />
      {secrets.map((secret) => (
        <Secret key={secret.name} secret={secret} />
      ))}
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontStyle: "italic",
      color: theme.palette.grey[500],
      marginRight: theme.spacing(1),
    },
  })
);

function Secret({ secret }: { secret: SecretData }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary>
        <div>
          <span className={classes.label}>Name:</span>
          <span>{secret.name}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <span className={classes.label}>Hint:</span>
          <span>{secret.hint}</span>
        </div>
        <div>
          <span className={classes.label}>Restrictions:</span>
          <span>{secret.restrictions}</span>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
