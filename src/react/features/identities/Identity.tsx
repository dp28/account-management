import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Identity as IdentityData } from "../../../domain";
import { Secrets } from "./secrets/Secrets";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontStyle: "italic",
      color: theme.palette.grey[500],
      marginRight: theme.spacing(1),
    },
  })
);

export function Identity({ identity }: { identity: IdentityData }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary>
        <span className={classes.name}>{identity.name}:</span> {identity.value}
      </AccordionSummary>
      <AccordionDetails>
        <Secrets identityId={identity.id} />
      </AccordionDetails>
    </Accordion>
  );
}
