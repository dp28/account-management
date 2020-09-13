import React, { useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { addIdentity } from "../../../domain";
import { ID } from "../../../domain/framework";
import { PersonSelector } from "../people/PersonSelector";
import { SuggestInput } from "../../utilityComponents/SuggestInput";
import {
  selectUniqueIdentityNames,
  selectUniqueIdentityValuesForPerson,
} from "../../../domain/identities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiFormControl-root": {
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
  organisationId: ID;
};

export function AddIdentity({ organisationId }: Props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [personId, setPersonId] = useState("");
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
          <PersonSelector onChange={(person) => setPersonId(person.id)} />

          <SuggestInput
            label="Name"
            selector={selectUniqueIdentityNames}
            onValueChange={setName}
            textFieldProps={{
              value: name,
              required: true,
              placeholder: "Eg Username, Email, etc",
            }}
          />

          <SuggestInput
            label="Value"
            selector={selectUniqueIdentityValuesForPerson(personId)}
            onValueChange={setValue}
            textFieldProps={{
              value,
              required: true,
            }}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button type="submit">Add Identity</Button>
        </AccordionActions>
      </Accordion>
    </form>
  );
}
