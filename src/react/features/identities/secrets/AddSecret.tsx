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
import { addSecret, ID, selectUniqueSecretNames } from "../../../../domain";
import { SuggestInput } from "../../../utilityComponents/SuggestInput";

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
  identityId: ID;
};

export function AddSecret({ identityId }: Props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [hint, setHint] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const dispatch = useDispatch();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addSecret({ name, hint, identityId, restrictions }));
    setName("");
    setHint("");
    setRestrictions("");
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
            Add new secret
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SuggestInput
            label="Name"
            selector={selectUniqueSecretNames}
            onValueChange={setName}
            textFieldProps={{
              value: name,
              required: true,
              placeholder: "Eg Password, PIN, etc",
            }}
          />

          <TextField
            label="Hint"
            value={hint}
            required
            onChange={(event) => setHint(event.target.value)}
          />

          <TextField
            label="Restrictions"
            value={restrictions}
            multiline
            required
            placeholder="Eg only numbers, must be at least 6 characters, etc"
            onChange={(event) => setRestrictions(event.target.value)}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button type="submit">Add Secret</Button>
        </AccordionActions>
      </Accordion>
    </form>
  );
}
