import React, { useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { addIdentity } from "../../../domain";
import { ID } from "../../../domain/framework";
import { PersonSelector } from "../people/PersonSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    title: {
      fontSize: 14,
    },
  })
);

type Props = {
  organisationId?: ID;
  personId?: ID;
};

export function AddIdentity({
  organisationId: fixedOrganisationId,
  personId: fixedPersonId,
}: Props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [organisationId, setOrganisationId] = useState(
    fixedOrganisationId || ""
  );
  const [personId, setPersonId] = useState(fixedPersonId || "");
  const dispatch = useDispatch();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addIdentity({ name, value, organisationId, personId }));
    setName("");
    setValue("");
  };

  return (
    <form className={classes.root} onSubmit={submit}>
      <Accordion>
        <AccordionSummary>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Add new identity
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="identityName"
            required
            label="Name"
            value={name}
            placeholder="Eg Username, Email, etc"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            id="identityValue"
            required
            label="Value"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          {fixedPersonId || (
            <PersonSelector onChange={(person) => setPersonId(person.id)} />
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button type="submit">Add Identity</Button>
        </AccordionActions>
      </Accordion>
    </form>
  );
}
